// HomeScreen.tsx
import React, { ReactNode, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

// Test Data
import meeting_dummy from '../../data/dummy_data.json';
import board_dummy from '../../data/dummy_data2.json';

// Icon
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import CategoryIcons from '../../utility/icon';

// Type
import {
  CATEGORY_VALUE,
  CATEGORY_LABEL,
  type Category,
} from '../../type/category';
import { boardPopular } from '../../type/board';
import { Meeting } from '../../type/meeting';

// Component
import { HomeCalendar } from '../../component/calendar/calendar';


import styles from './styles';
import Colors from '../../utility/color';

// ============================================================

// Main
export default function HomeScreen() {
  const [meetings, setMeetings] = useState<Meeting[]>(
    meeting_dummy as Meeting[],
  );

  const [boards, setBoards] = useState<boardPopular[]>(
    board_dummy as boardPopular[],
  );

  const onPressMeeting = (meeting: Meeting) => {

  };

  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  return(
    <>
      <ScrollView
          style={styles.scroll_container}
          contentContainerStyle={[
          styles.scroll_content_container,
          { paddingBottom: tabBarHeight + 6 }, 
    ]}
          showsVerticalScrollIndicator={false}
          
        >

          {/* Categories */}
          {/* <View style={styles.category_container}>
            {CATEGORY_VALUE.map(item => (
              <CategoryCard key={item} item={item} />
            ))}
          </View> */}

          {/* Meeting Preview */}
          <View style={[styles.meeting_card]}>
            <View style={[styles.header_container, {marginHorizontal: 14} ]}>
              <Text style={[styles.card_title,{marginBottom: 12}]}>인기 모임</Text>
              <Pressable>
                <Text style={styles.guide_text}>
                  더보기{' '}
                  <FontAwesome6
                    name="angle-right"
                    iconStyle="solid"
                    style={styles.guide_text}
                  />
                </Text>
              </Pressable>
            </View>

            <FlatList
              data={meetings}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{ gap: 12, paddingHorizontal: 4 }}
              renderItem={({ item }) => (
                <MeetingPreviewCard
                  meeting={item}
                  onPress={onPressMeeting}
              />)}    
            />
          </View>

          {/* Board Preview */}
          <View style={[styles.header_container,{paddingHorizontal: 12,}]}>
              <Text style={styles.card_title}>인기 게시물</Text>
              <Pressable>
                <Text style={styles.guide_text}>
                  더보기{' '}
                  <FontAwesome6
                    name="angle-right"
                    iconStyle="solid"
                    style={styles.guide_text}
                  />
                </Text>
              </Pressable>
            </View>
          <View style={[styles.card]}>
            <View>
              {boards.slice(0,8).map((item, idx) => (
                <BoardPreview key={`${item.id}-${idx}`} item={item} />
              ))}
            </View>
          </View>

          {/* Calendar */}
          <View style={styles.card}>
            <View style={[styles.header_container, { marginBottom: 4 }]}>
              <Text style={styles.card_title}>나의 일정</Text>
              <FontAwesome6
                name="angle-right"
                iconStyle="solid"
                style={styles.guide_text}
              />
            </View>
            <HomeCalendar />
          </View>
      </ScrollView>
    </>
  );
}

// Component
// function CategoryCard({ item }: { item: Category }) {
//   return (
//     <>
//       <Pressable
//         style={[styles.category_button, { backgroundColor: Colors[item].sub }]}
//       >
//         <View style={{ alignItems: 'flex-start' }}>
//           <CategoryIcons category={item} />
//         </View>
//         <View style={{ alignItems: 'flex-end' }}>
//           <Text>{CATEGORY_LABEL[item]}</Text>
//         </View>
//       </Pressable>
//     </>
//   );
// }

type MeetingProps = {
  meeting: Meeting;

  onPress?: (meeting: Meeting) => void;
};
function MeetingPreviewCard({ meeting, onPress }: MeetingProps)  {
  return (
    <>
      <Pressable
         onPress={() => onPress?.(meeting)}
          style={({ pressed }) => [
            styles.meetingPreview_card,
            {
              backgroundColor: pressed
                ? Colors[meeting.category].main
                : Colors[meeting.category].sub, 
              borderColor: Colors[meeting.category].main
            },
            pressed && { transform: [{ scale: 0.98 }] }, 
      ]}
      >
        <View style={styles.meetingPreview_header}>
          <CategoryIcons category={meeting.category} size={12} />
          <Text style={styles.meetingPreview_title}>{meeting.title}</Text>
        </View>

        <Text style={styles.meetingPreview_host}>
          방장: {meeting.host.name}
        </Text>

        <View style={styles.footer_container}>
          <View style={styles.footer_metaItem}>
            <FontAwesome6 name="heart" iconStyle="solid" color={Colors.red} />
            <Text style={styles.footer_metaItem_text}>{meeting.like}</Text>
          </View>
          <View style={styles.footer_metaItem}>
            <FontAwesome6
              name="user-group"
              iconStyle="solid"
              color={Colors.guide}
            />
            <Text style={styles.footer_metaItem_text}>
              {meeting.curMember} / {meeting.maxMember}
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}

type BoardPreviewProps = {
  item: boardPopular;
  onPress?: (item: boardPopular) => void;
};

function BoardPreview({ item, onPress }: BoardPreviewProps){
  return (
    <Pressable style={({ pressed }) => [
        styles.boardPreview_board,
        pressed && { backgroundColor: '#f2f2f2' },
      ]}>
      <Text style={styles.boardPreview_board_title}>{item.title}</Text>
      <Text style={styles.boardPreview_board_content}>{item.content}</Text>

      <View style={styles.footer_container}>
        <View style={styles.footer_metaItem}>
          <FontAwesome6 name="heart" iconStyle="solid" color={Colors.red} />
          <Text style={styles.footer_metaItem_text}>{item.like}</Text>
        </View>

        <View style={styles.footer_metaItem}>
          <FontAwesome6 name="comment" iconStyle="solid" color={Colors.guide} />
          <Text style={styles.footer_metaItem_text}>{item.commentCount}</Text>
        </View>
      </View>
    </Pressable>
  );
}
