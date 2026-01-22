import { Text, View, Pressable } from 'react-native';

// Style
import styles from './Header.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

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

export function SingleBackHeader() {
  return (
    <>
      <View>
        <Pressable>
          <FontAwesome6
            name="chevron-left"
            iconStyle="solid"
            size={12}
            color={'black'}
          />
        </Pressable>
      </View>
    </>
  );
}
