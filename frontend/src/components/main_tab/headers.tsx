import { Text, View, Pressable } from 'react-native';

// Style
import styles from './headerStyle';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

export function HomeScreenTitle() {
  return (
    <>
      <View>
        <Text style={[styles.base_title, styles.home_title]}>UNILINK</Text>
      </View>
    </>
  );
}

export function ChattingListTitle() {
  return (
    <>
      <View>
        <Text style={styles.base_title}>채팅</Text>
      </View>
    </>
  );
}

export function ChattingListRightHeader() {
  return (
    <>
      <View style={styles.chatingList_container}>
        <Pressable>
          <FontAwesome6
            name="magnifying-glass"
            iconStyle="solid"
            size={18}
            color={'black'}
          />
        </Pressable>
      </View>
    </>
  );
}
