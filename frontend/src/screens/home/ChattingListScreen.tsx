// src/screens/home/ChattingListScreen.tsx

import { SafeAreaView } from 'react-native-safe-area-context';

// Component
import TitleSearchHeader from '../../components/headers/TitleSearchHeader';

// Icon
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import Entypo from '@react-native-vector-icons/entypo';

// Style
import globalStyles from '../../utils/globalStyle';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import PALETTE from '../../utils/color';
import {
  CATEGORY,
  CATEGORY_LABEL,
  CategoryType,
} from '../../types/meeting/meetingType';
import CategoryIcon from '../../utils/Icon';
import { chatBoxDummyData } from '../../dummy/chattingBoxDummyData';

/* ==================== Main ==================== */
const ChattingListScreen = () => {
  return (
    <>
      <SafeAreaView style={[globalStyles.safeAreaView, { paddingBottom: 0 }]}>
        {/* Header */}
        <TitleSearchHeader title="채팅" />

        {/* Category Bar */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flexGrow: 0, marginBottom: 24 }}
          contentContainerStyle={styles.categoryBarContent_container}
        >
          <CategoryButton category="all" onPress={() => null} />
          {CATEGORY.map(item => (
            <CategoryButton key={item} category={item} onPress={() => null} />
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {chatBoxDummyData.map(item => (
            <ChatBox key={item.chatId} {...item} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

/* ==================== Component ==================== */
type CategoryButtonProps = {
  category: CategoryType | 'all';
  onPress: () => void;
};
const CategoryButton = ({ category, onPress }: CategoryButtonProps) => {
  return (
    <Pressable
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
          gap: 8,
          borderWidth: 1,
          borderRadius: 999,
        },
        category === 'all' && {
          width: 60,
        },
      ]}
      onPress={onPress}
    >
      {category !== 'all' && <CategoryIcon category={category} />}
      <Text>{category !== 'all' ? CATEGORY_LABEL[category] : '전체'}</Text>
    </Pressable>
  );
};

export type ChatBoxProp = {
  chatId: number;
  title: string;
  lastMessage: string;
  lastSendDate: string;
  read: boolean;
  onPress?: () => void;
};
const ChatBox = (props: ChatBoxProp) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
      }}
    >
      <View>
        <View></View>

        <View>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{props.title}</Text>
          <Text style={{ fontSize: 14, color: PALETTE.text_guide }}>
            {props.lastMessage}
          </Text>
        </View>
      </View>
      {!props.read && <Entypo name="dot-single" size={30} />}
    </Pressable>
  );
};

/* ==================== Style ==================== */
const styles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 12,
    paddingBottom: 16,

    backgroundColor: PALETTE.background,
  },

  categoryBarContent_container: {
    flexDirection: 'row',

    gap: 8,
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: PALETTE.text_guide,
  },
});

/* ==================== Export ==================== */
export default ChattingListScreen;
