import { Text, View } from 'react-native';

// Style
import styles from './headerStyle';

export function ServerPingTestHeader() {
  return (
    <>
      <View>
        <Text style={styles.base_title}>서버 통신 테스트</Text>
      </View>
    </>
  );
}

export function HomeScreenHeader() {
  return (
    <>
      <View>
        <Text style={[styles.base_title, styles.home_title]}>UNILINK</Text>
      </View>
    </>
  );
}

export function ChattingListHeader() {
  return (
    <>
      <View>
        <Text style={styles.base_title}>채팅</Text>
      </View>
    </>
  );
}
