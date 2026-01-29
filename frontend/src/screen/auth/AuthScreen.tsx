import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KakaoLoginToken, login } from '@react-native-kakao/user';

// Component
import KakaoButton from '../../component/button/AuthButton';

// Style
import GlobalStyle, { Color } from '../../../globalStyle';

// Type
import { AuthStackParamList } from '../../navigation/type';
type Props = NativeStackScreenProps<AuthStackParamList, 'Auth'>;

// ==================== Main ==================== //
export default function AuthScreen({ navigation }: Props) {
  const [token, setToken] = useState<string>(''); // = accessToken
  const [loading, setLoading] = useState<boolean>(false);

  // Handle
  /**
   * 카카오톡 로그인 버튼 시 실행되는 handle
   * @returns
   */
  const handleAuthForKakao = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let nextToken = token;

      if (!nextToken) {
        const { accessToken, idToken } = await login();
        nextToken = accessToken;
        setToken(nextToken);
      }

      if (!nextToken) {
        console.log('[log] nextToken is empty');
        return;
      }

      navigation.navigate('Name', { accessToken: nextToken });
    } catch (e) {
      console.log(`Error: ${e}`);
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
