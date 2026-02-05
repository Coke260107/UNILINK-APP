import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { login as kakaoLogin } from '@react-native-kakao/user';

// Api
import * as AuthApi from '../../api/authApi';

// Component
import KakaoButton from '../../component/button/AuthButton';
import LoadingScreen from '../../component/loading/LoadingScreen';

// Style
import GlobalStyle, { Color } from '../../../globalStyle';

// Type
import { UserRoleType } from '../../type/userType';
import { AuthStackParamList } from '../../navigation/type';

// Utiltiy
import { setJwtToken, getJwtToken } from '../../utility/keychain';
import useAuth from '../../context/auth/useAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Auth'>;

// ==================== Main ==================== //
export default function AuthScreen({ navigation }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  // Handle
  /**
   * 카카오톡 로그인 버튼 시 실행되는 handle
   */
  const handleAuthForKakao = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let token = await getJwtToken();

      if (!token) {
        const { accessToken } = await kakaoLogin();
        const registerResponse = await AuthApi.Register(accessToken);
        token = registerResponse.jwtToken;
        await setJwtToken(token);
      }

      const { userRole } = await AuthApi.Auth(token);

      console.log(`[handleAuthForKakao] userRole is ${userRole}`);

      if (userRole === 'Guest') {
        navigation.navigate('Name');
        return;
      }

      await login();
    } catch (error) {
      // try {
      //   const storedToken = await getJwtToken();

      //   if (storedToken) {
      //     const data = await AuthApi.Auth(storedToken);

      //     if (data.userRole === 'Guest') {
      //       navigation.navigate('Name');
      //       return;
      //     }

      //     await login();
      //   }

      //   if (!storedToken) {
      //     const { accessToken } = await kakaoLogin();

      //     const data = await AuthApi.Register(accessToken);
      //     await setJwtToken(data.jwtToken);

      //     // Baaned 추가 예정
      //     if (data.userRole === 'Guest') {
      //       navigation.navigate('Name');
      //       return;
      //     }
      //   }
      // }
      console.error(`[error] handleAuthForKakao : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={[GlobalStyle.safeAreaView]}>
        <View style={[GlobalStyle.base_container, style.root_container]}>
          <View style={[style.top_container]}>
            <Text style={[style.title]}>UNILINK</Text>
            <Text style={[style.subTitle]}>모임의 시작, UNILINK</Text>
          </View>

          <View style={[style.bottom_container]}>
            <KakaoButton onPress={handleAuthForKakao} />
          </View>
        </View>

        {/* Loading Screen */}
        {loading && <LoadingScreen />}
      </SafeAreaView>
    </>
  );
}

// ==================== Style ==================== //
const style = StyleSheet.create({
  root_container: {
    justifyContent: 'space-between',
  },

  top_container: {
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 80,
  },

  title: {
    fontSize: 42,
    fontWeight: '800',
  },

  subTitle: {
    fontSize: 24,
    fontWeight: '600',

    color: Color.guideText,
  },

  bottom_container: {
    justifyContent: 'center',
  },
});
