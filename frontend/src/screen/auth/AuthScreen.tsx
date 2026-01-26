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

// ============================================================

// Main
export default function AuthScreen({ navigation }: Props) {
  const [accessToken, setAccessToken] = useState<String>('');
  // Handle
  const handleAuthForKakao = async () => {
    try {
      const { accessToken } = await login();
      setAccessToken(accessToken);
      navigation.navigate('Name', { accessToken: accessToken });
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <>
      <SafeAreaView style={[GlobalStyle.safeAreaView]}>
        <View
          style={[
            GlobalStyle.base_container,
            { justifyContent: 'space-between' },
          ]}
        >
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

// ============================================================

// Style
const style = StyleSheet.create({
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
