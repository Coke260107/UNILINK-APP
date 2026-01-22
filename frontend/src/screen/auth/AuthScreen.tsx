import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Api
import * as api from '../../api/auth/Auth.api';

// Component
import KakaoButton from '../../component/buttons/AuthButton';

// Style
import globalStyle from '../../../globalStyle';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../type/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Auth'>;

async function handleAuthBUtton() {
  console.log('실행됨');
  try {
    const authCode = await api.getKakaoAuthCode();
    console.log(authCode);
  } catch (e) {
    console.log(e);
    return;
  }
}

function AuthScreen({ navigation }: Props) {
  return (
    <>
      <SafeAreaView
        style={[
          globalStyle.base_container,
          { justifyContent: 'space-between' },
        ]}
      >
        <View style={styles.top_container}>
          <Text style={styles.title}>UNILINK</Text>
          <Text style={styles.subTitle}>모임의 시작, UNILINK</Text>
        </View>
        <View style={styles.bottom_container}>
          <KakaoButton onPress={() => handleAuthBUtton} />
        </View>
      </SafeAreaView>
    </>
  );
}

export default AuthScreen;
