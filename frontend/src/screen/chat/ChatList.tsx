import { View, Text, ScrollView, Pressable } from 'react-native';

// Type
import { Category, CATEGORY_LABEL, CATEGORY_VALUE } from '../../type/category';
import { Chattings } from '../../utility/chattings';
const CATEGORY_FILTER = ['all', ...CATEGORY_VALUE] as const;
type CategoryFilter = (typeof CATEGORY_FILTER)[number];

// Style
import globalStyle, { Color } from '../../../globalStyle';
import styles from './styles';
import Colors from '../../utility/color';
import CategoryIcons from '../../utility/icon';
import { useState } from 'react';

// Test Data
import chatting_dummy from '../../data/dummy_data3.json'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

//==========================================

//main
function ChattingListScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('all');
  const [chattings, setchattings] = useState<Chattings[]>(
    chatting_dummy as Chattings[],
  );
  const sortedChattings = [...chattings].sort(
  (a, b) =>
    new Date(b.lastMessageAt).getTime() -
    new Date(a.lastMessageAt).getTime()
  );
  

  return (
    <>
      <ScrollView
        style={styles.scroll_container}
        contentContainerStyle={styles.scroll_content_container}
      >
        <ScrollView
          horizontal
          contentContainerStyle={styles.category_container}
          showsHorizontalScrollIndicator={false}
        >
          {CATEGORY_FILTER.map(item => (
            <CategoryButton
              key={item}
              item={item}
              selected={item === selectedCategory}
              onPressed={() => setSelectedCategory(item)}
            />
          ))}
        </ScrollView>
          {sortedChattings.map((item) => (
            <ChattingList key={item.id} item={item} />
          ))}
      </ScrollView>
    </>
  );
}
export default ChattingListScreen;

// Component
type CategoryButtonProps = {
  item: CategoryFilter;
  selected: boolean;
  onPressed: () => void;
};
function CategoryButton(props: CategoryButtonProps) {

  return (
    <>
      <Pressable
        style={[
          styles.category_button,
          props.item === 'all'
            ? props.selected 
            ? {backgroundColor: Colors.border, borderColor: Color.guideText} 
            :{ backgroundColor: 'white' }
            : props.selected
              ? {backgroundColor: Colors[props.item].main, borderColor: Colors[props.item].pressed}
              : {backgroundColor: Colors[props.item].sub}
        ]}
        onPress={props.onPressed}
      >
        {props.item === 'all' ? (
          <>
            <Text style={styles.category_button_Text}>전체</Text>
          </>
        ) : (
          <>
            <CategoryIcons category={props.item} size={14} />
            <Text style={styles.category_button_Text}>
              {CATEGORY_LABEL[props.item]}
            </Text>
          </>
        )}
      </Pressable>
    </>
  );
}

// ChattingList Component
type ChattingProps = {
  item: Chattings;
};

function ChattingList({ item }: ChattingProps) {
  const isUnread =
    new Date(item.lastMessageAt).getTime() >
    new Date(item.lastReadAt).getTime();
  return(
    <>
      <Pressable 
        style={({ pressed }) => [
        styles.chattingList_container,
        pressed && { backgroundColor: '#f2f2f2' },
      ]}>
        <View style={styles.chattingList_card}>
          <View style={{ flex: 1, gap : 12}}>
            <Text 
              style={[styles.chatList_title,
              isUnread && { fontWeight: '700' }
              ]}>
                {truncate(item.title, 30)}
            </Text>
            <Text 
              style={[
                styles.chatList_lastMessage,
                isUnread && { color: 'rgb(38, 38, 38)' },
              ]}>{truncate(item.lastMessage, 28)}</Text>
          </View>

          <Text 
            style={[
              styles.chatList_lastMessageAt,
              isUnread && { color: 'rgb(82, 82, 82)'}
              ]}>
            {timeAgo(item.lastMessageAt)}
          </Text>
          {isUnread && (
            <FontAwesome6 style={{marginTop:10, position: 'absolute',  right: 10, top: 30 }}
              name="circle"
              iconStyle='solid'
              color={Colors.red}
            />

    )}
      </View>
        </Pressable>
    </>
  );
}

// 시간 변환
function timeAgo(isoTime: string) {
  const now = new Date();
  const past = new Date(isoTime);

  const diffMs = now.getTime() - past.getTime();
  const diffMin = Math.floor(diffMs / 1000 / 60);

  if (diffMin < 1) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}일 전`;

  const diffWeek = Math.floor(diffDay / 7);
  if(diffWeek < 4)  return `${diffWeek}주 전`;

  const diffMonth = Math.floor(diffWeek / 4);
  if(diffMonth < 12) return `${diffMonth}달 전`
  
  const diffYear = Math.floor(diffMonth / 12)
  return `${diffYear}년 전`
}

// 글자수 자르기
function truncate(text: string, maxLength: number) {
  if (!text) return '';
  return text.length > maxLength
    ? text.slice(0, maxLength) + '..'
    : text;
}