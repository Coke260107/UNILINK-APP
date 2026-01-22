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

// Component
import { HomeCalendar } from '../../component/calendars/calendar';

// Style
import globalStyle from '../../../globalStyle';
import styles from './styles';
import Colors from '../../utility/color';

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

import type { Meeting } from '../../type/meeting';

export default function HomeScreen() {
  const [meetings, setMeetings] = useState<Meeting[]>(
    meeting_dummy as Meeting[],
  );

  const [boards, setBoards] = useState<boardPopular[]>(
    board_dummy as boardPopular[],
  );
  const insets = useSafeAreaInsets();

  const onPress = () => {
    Alert.alert('Home', 'Button pressed');
  };

  return (
    <>
      <ScrollView
        style={globalStyle.scroll_container}
        contentContainerStyle={globalStyle.scroll_content_container}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.search_bar}>
          <TextInput style={{ flex: 1 }} placeholder="모임 검색" />
          <FontAwesome6
            name="magnifying-glass"
            iconStyle="solid"
            size={18}
            style={{ marginRight: 4 }}
          />
        </View>

        {/* Categories */}
        <View style={styles.category_container}>
          {CATEGORY_VALUE.map(item => (
            <CategoryCard key={item} item={item} />
          ))}
        </View>

        {/* Meeting Preview */}
        <View style={[globalStyle.card]}>
          <View style={styles.header_container}>
            <Text style={globalStyle.card_title}>인기 모임</Text>
            <Pressable>
              <Text style={globalStyle.guide_text}>
                더보기{' '}
                <FontAwesome6
                  name="angle-right"
                  iconStyle="solid"
                  style={globalStyle.guide_text}
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
            renderItem={({ item }) => <MeetingPreviewCard meeting={item} />}
          />
        </View>

        {/* Board Preview */}
        <View style={[globalStyle.card]}>
          <View style={styles.header_container}>
            <Text style={globalStyle.card_title}>인기 게시물</Text>
            <Pressable>
              <Text style={globalStyle.guide_text}>
                더보기{' '}
                <FontAwesome6
                  name="angle-right"
                  iconStyle="solid"
                  style={globalStyle.guide_text}
                />
              </Text>
            </Pressable>
          </View>

          <View>
            {boards.map(item => (
              <BoardPreview key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Calendar */}
        <View style={globalStyle.card}>
          <View style={[styles.header_container, { marginBottom: 4 }]}>
            <Text style={globalStyle.card_title}>나의 일정</Text>
            <FontAwesome6
              name="angle-right"
              iconStyle="solid"
              style={globalStyle.guide_text}
            />
          </View>
          <HomeCalendar />
        </View>
      </ScrollView>
    </>
  );
}

// Component
function CategoryCard({ item }: { item: Category }) {
  return (
    <>
      <Pressable
        style={[styles.category_button, { backgroundColor: Colors[item].sub }]}
      >
        <View style={{ alignItems: 'flex-start' }}>
          <CategoryIcons category={item} />
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text>{CATEGORY_LABEL[item]}</Text>
        </View>
      </Pressable>
    </>
  );
}

function MeetingPreviewCard({ meeting }: { meeting: Meeting }) {
  return (
    <>
      <Pressable
        style={[
          styles.meetingPreview_card,
          { backgroundColor: Colors[meeting.category].sub },
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
            <FontAwesome6 name="heart" iconStyle="solid" color={Colors.main} />
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

function BoardPreview({ item }: { item: boardPopular }) {
  return (
    <Pressable style={styles.boardPreview_board}>
      <Text style={styles.boardPreview_board_title}>{item.title}</Text>
      <Text style={styles.boardPreview_board_content}>{item.content}</Text>

      <View style={styles.footer_container}>
        <View style={styles.footer_metaItem}>
          <FontAwesome6 name="heart" iconStyle="solid" color={Colors.main} />
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
