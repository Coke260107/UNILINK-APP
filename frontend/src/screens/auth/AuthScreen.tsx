import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Component
import KakaoButton from '../../components/AuthButton';

// Style
import globalStyle from '../../../globalStyle';
import styles from './styles';

function AuthScreen() {
  return (
    <>
      <SafeAreaView style={[{ flex: 1 }]}>
        <View
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
            <KakaoButton />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default AuthScreen;
