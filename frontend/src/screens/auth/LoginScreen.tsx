// src/screens/auth/LoginScreen.tsx

import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { login as kakaoLogin } from '@react-native-kakao/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Api

// Component
import LoadingModal from '../../components/modals/LoadingModal';
import KakaoLoginButton from '../../components/buttons/KakaoLoginButton';

// Type
import { AuthStackParamList } from '../../types/util/navigationType';

// Style
import globalStyles from '../../utils/globalStyle';

// Context
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types/user/userType';
import { getJwtToken, saveJwtToken } from '../../utils/keychain';

// ==================== Main ==================== //
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({ navigation, route }: Props) => {
  const { user, login, setUser } = useAuth();

  // useState
  const [loading, setLoading] = useState<boolean>(false);

  // Handle
  const handleLoginWithKakao = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { accessToken } = await kakaoLogin();
      const user = await login(accessToken);
      setUser(user);

      if (user.userState === 'GUEST') {
        navigation.navigate('SetNickname');
      }
    } catch (error: any) {
      Alert.alert('로그인 오류', '로그인 실패');
    } finally {
      setLoading(false);
    }
  };

  // useEffect
  useEffect(() => {
    if (!user) return;

    navigation.navigate('SetNickname');
  }, []);

  return (
    <>
      <SafeAreaView style={[globalStyles.safeAreaView]}>
        <View style={[styles.root_container]}>
          <View style={[styles.top_container]}>
            <Text style={[styles.title]}>UNILINK</Text>
            <Text style={[styles.sub_title]}>모임의 시작, UNILINK</Text>
          </View>

          <View style={[styles.bottom_container]}>
            <KakaoLoginButton onPress={handleLoginWithKakao} />
          </View>
        </View>
      </SafeAreaView>

      {/* Modal */}
      <LoadingModal message="로그인 중..." visible={loading} />
    </>
  );
};

// ==================== Style ==================== //
const styles = StyleSheet.create({
  root_container: {
    flex: 1,

    justifyContent: 'space-between',
  },

  top_container: {
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 80,
  },

  title: {
    fontSize: 40,
    fontWeight: '800',
  },

  sub_title: {
    fontSize: 20,
    fontWeight: '600',
  },

  bottom_container: {
    justifyContent: 'center',
  },
});

// ==================== Export ==================== //
export default LoginScreen;
