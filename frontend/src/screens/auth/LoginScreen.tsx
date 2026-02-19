// src/screens/auth/LoginScreen.tsx

import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { login as kakaoLogin } from '@react-native-kakao/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Api
import { login } from '../../api/auth/authApi';

// Component
import LoadingModal from '../../components/modals/LoadingModal';
import KakaoLoginButton from '../../components/buttons/KakaoLoginButton';

// Type
import { AuthStackParamList } from '../../types/navigationType';

// Style
import globalStyles from '../../utils/globalStyle';

// Context
import { useAuth } from '../../contexts/AuthContext';

// ==================== Main ==================== //
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login: authLogin } = useAuth();

  // Handle
  const handleLoginWithKakao = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const { accessToken } = await kakaoLogin();

      const data = await login(accessToken);

      console.log(data.state);

      if (data.state === 'GUEST') {
        console.log('여기 실행됨');
        navigation.navigate('SetNickname');
      }
    } catch (error: any) {
      Alert.alert('오류가 발생했습니다. 잠시후에 다시 시도해 주세요');
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

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
