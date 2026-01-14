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
import { Calendar } from 'react-native-calendars';

// Component
import { HomeCalendar } from '../components/calendar';

// Style
import globalStyle from '../styles/globalStyle';
import { styles } from '../styles/HomeScreenStyle';
import Colors from '../utils/color';

// Test Data
import meeting_dummy from '../data/dummy_data.json';

// Icon
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import CategoryIcons from '../utils/icon';

// Type
import {
  CATEGORY_VALUE,
  CATEGORY_LABEL,
  type Category,
} from '../types/category';

import type { Meeting } from '../types/meeting';

export default function HomeScreen() {
  const [meetings, setMeetings] = useState<Meeting[]>(
    meeting_dummy as Meeting[],
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
        <View style={[globalStyle.base_card]}>
          <View style={styles.header_container}>
            <Text style={globalStyle.base_card_title}>인기 모임</Text>
            <Pressable>
              <Text style={globalStyle.base_guide}>
                전체모임{' '}
                <FontAwesome6
                  name="angle-right"
                  iconStyle="solid"
                  style={globalStyle.base_guide}
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

        {/* Calendar */}
        <View style={globalStyle.base_card}>
          <View style={[styles.header_container, { marginBottom: 4 }]}>
            <Text style={globalStyle.base_card_title}>나의 일정</Text>
            <FontAwesome6
              name="angle-right"
              iconStyle="solid"
              style={globalStyle.base_guide}
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
          {CategoryIcons[item]()}
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
        <View style={styles.meetingPreview_card_header}>
          {CategoryIcons[meeting.category]({ size: 12 })}
          <Text style={styles.meetingPreview_card_title}>{meeting.title}</Text>
        </View>

        <Text style={{ fontSize: 12, marginBottom: 50 }}>
          방장: {meeting.host.name}
        </Text>

        <View style={styles.meetingPreview_card_footer}>
          <View style={styles.meetingPreview_card_memberView}>
            <FontAwesome6 name="user-group" iconStyle="solid" />
            <Text>
              {meeting.curMember} / {meeting.maxMember}
            </Text>
          </View>

          <Pressable style={styles.meetingPreview_card_joinButton}>
            <Text>상세보기</Text>
          </Pressable>
        </View>
      </Pressable>
    </>
  );
}
