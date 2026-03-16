// src/components/map/NaverMap.tsx

import { NaverMapView } from '@mj-studio/react-native-naver-map';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PALETTE from '../../utils/color';
import { Coords } from '../../screens/auth/SetLocationScreen';

// Type & Const
type Props = {
  coords: Coords | null;
  onCameraChanged: (params: Coords) => void;
};

type Camera = Coords & { zoom: number };

const DEFAULT_CAMERA: Camera = {
  latitude: 37.5665,
  longitude: 126.978,
  zoom: 14,
};

const KOREA_EXTENT = {
  latitude: 33.0,
  longitude: 124.0,
  latitudeDelta: 9.0,
  longitudeDelta: 10.0,
};

/* ==================== Main ==================== */
const NaverMap = ({ coords, onCameraChanged }: Props) => {
  // useState
  const [camera, setCamera] = useState<Camera>(DEFAULT_CAMERA);

  // Handle
  const handleInitialize = useCallback(() => {
    const { latitude, longitude } = coords ?? DEFAULT_CAMERA;
    setCamera({ latitude, longitude, zoom: 14 });
  }, [coords]);

  // useEffect
  useEffect(() => {
    if (coords === null) return;
    handleInitialize();
    onCameraChanged(coords);
  }, [coords]);

  return (
    <View style={{ flex: 1 }}>
      <NaverMapView
        camera={camera}
        extent={KOREA_EXTENT}
        isShowZoomControls={false}
        isShowLocationButton
        style={styles.map}
        minZoom={6}
        maxZoom={18}
        onCameraChanged={params => {
          if (params.reason === 'Gesture') onCameraChanged(params);
        }}
      />
      <FontAwesome6
        name="map-pin"
        iconStyle="solid"
        size={24}
        style={{
          position: 'absolute',
          color: PALETTE.main,
          zIndex: 100,
          top: '50%',
          left: '50%',
          transform: [{ translateX: -6 }, { translateY: -24 }],
        }}
      />
    </View>
  );
};

/* ==================== Style ==================== */
const styles = StyleSheet.create({
  map: { flex: 1 },
});

/* ==================== Export ==================== */
export default NaverMap;
