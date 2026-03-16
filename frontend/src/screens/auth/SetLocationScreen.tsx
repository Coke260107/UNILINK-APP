// src/screens/auth/SetLocationScreen.tsx

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

// Api
import { ReverseGeocode } from '../../api/user/userApi';
import { Register } from '../../api/auth/authApi';

// Context
import { useAuth } from '../../contexts/AuthContext';

// Components
import AnimatedPressable from '../../components/buttons/AnimatedPressable';
import BackButtonHeader from '../../components/headers/BackButtonHeader';
import NaverMap from '../../components/map/NaverMap';

// Style
import globalStyles from '../../utils/globalStyle';
import PALETTE from '../../utils/color';

// Type
export type Coords = { latitude: number; longitude: number };
import { UserMetaData } from '../../types/user/userType';

/* ==================== Handle ==================== */
/**
 * 위치 권한 설정 핸들
 * @returns boolean
 */
const handleEnsureLocationPermission = async (): Promise<boolean> => {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  const status = await check(permission);
  if (status === RESULTS.GRANTED) return true;

  const res = await request(permission);
  return res === RESULTS.GRANTED;
};

/* ==================== Main ==================== */
const SetLocationScreen = () => {
  // context
  const { user, updateUserMetaData } = useAuth();

  // useState
  const [coords, setCoords] = useState<Coords | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [serverLoading, setServerLoading] = useState(false);

  // useRef
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle
  /**
   * 지도 이동 시 호출되는 핸들
   */
  const handleCameraChanged = useCallback((params: Coords) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      if (loadingLocation) return;
      setLoadingLocation(true);

      try {
        const data = await ReverseGeocode({
          latitude: params.latitude,
          longitude: params.longitude,
        });
        console.log(data.address);
        setAddress(data.address);
      } catch (e) {
        if (__DEV__) console.log('[주소 조회 실패]', e);
      } finally {
        setLoadingLocation(false);
      }
    }, 800);
  }, []);

  /**
   * 완료 버튼 핸들
   */
  const handleComfirm = async () => {
    if (!address) return;
    if (serverLoading) return;

    setServerLoading(true);

    try {
      const location: UserMetaData = {
        location: address,
      };

      const updatedUserData = { ...user, location: address };
      updateUserMetaData(updatedUserData);
      const data = await Register(updatedUserData);
      console.log(data);
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setServerLoading(false);
    }
  };

  // useEffect
  useEffect(() => {
    handleEnsureLocationPermission().then(granted => {
      if (granted) {
        Geolocation.getCurrentPosition(pos => {
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        });
      }
    });
  }, []);

  return (
    <SafeAreaView style={[globalStyles.safeAreaView]}>
      <BackButtonHeader />
      <View>
        <Text style={styles.title}>대략적인 위치를 알려주세요</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.address_container}>
          <Text style={styles.address_text}>
            {address === null || loadingLocation ? '위치 확인 중...' : address}
          </Text>
        </View>

        <View style={styles.map_container}>
          <NaverMap coords={coords} onCameraChanged={handleCameraChanged} />
        </View>

        <AnimatedPressable
          label={
            address === null || loadingLocation ? '위치 확인 중...' : '완료'
          }
          onPress={() => handleComfirm()}
          style={styles.button}
          loading={address === null || loadingLocation}
        />
      </View>
    </SafeAreaView>
  );
};

/* ==================== Style ==================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  address_container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: PALETTE.border,
    borderRadius: 16,
  },
  map_container: {
    flex: 1,
    borderWidth: 1,
    borderColor: PALETTE.border,
    borderRadius: 16,
    overflow: 'hidden',
  },
  address_text: {
    fontSize: 16,
  },
  button: {},
});

/* ==================== Export ==================== */
export default SetLocationScreen;
