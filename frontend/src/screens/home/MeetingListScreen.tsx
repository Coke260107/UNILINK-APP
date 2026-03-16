// src/screens/home/MeetingLisScreen.tsx
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  MainStackParamList,
  RootStackParamList,
} from '../../types/util/navigationType';

// Compoent
import TitleSearchHeader from '../../components/headers/TitleSearchHeader';
import AnimatedTextInput from '../../components/textInputs/AnimatedTextInput';

// Dummy
import { meetingListDummyData } from '../../dummy/meetingListDummyData';

// Icon
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Style
import globalStyles from '../../utils/globalStyle';
import PALETTE from '../../utils/color';

// Type
import { CategoryType } from '../../types/meeting/meetingType';
import { useState } from 'react';
import CategoryIcon from '../../utils/Icon';
import { getRemainingTime } from '../../utils/time';
type MeetingListNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainStackParamList, 'MeetingList'>,
  NativeStackNavigationProp<RootStackParamList>
>;

/* ==================== Main ==================== */
const MeetingListScreen = () => {
  const navigation = useNavigation<MeetingListNavProp>();

  const [meetings, setMeetings] =
    useState<MeetingCardProps[]>(meetingListDummyData);

  return (
    <SafeAreaView style={[globalStyles.safeAreaView]}>
      <View style={[styles.header_container]}>
        <Text style={[globalStyles.screen_title]}>모임</Text>

        <Pressable
          onPress={() => navigation.navigate('CreateMeeting')}
          style={[styles.create_pressable_1]}
        >
          <Text style={[styles.create_pressable_text]}>모임 생성하기</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar_container]}>
        <FontAwesome5 name="search" iconStyle="solid" size={16} />
        <TextInput
          style={[styles.search_textInput]}
          placeholder="원하는 모임을 검색해 보세요"
        />
      </View>

      {/* Meeting List */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={meetings}
          keyExtractor={item => item.meetingId.toString()}
          renderItem={({ item }) => <MeetingCard {...item} />}
          contentContainerStyle={styles.meeting_flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Pressable style={[styles.create_pressable]}>
        <FontAwesome6 name="plus" iconStyle="solid" size={28} color={'black'} />
      </Pressable>
    </SafeAreaView>
  );
};

/* ==================== Component ==================== */
type MeetingCardProps = {
  meetingId: number;
  category: CategoryType;
  title: string;
  host: string;
  curMember: number;
  maxMember: number;
  closedAt: string;
};
const MeetingCard = (props: MeetingCardProps) => {
  return (
    <>
      <Pressable
        style={{
          flexDirection: 'row',

          padding: 16,
          gap: 8,

          backgroundColor: PALETTE.panel,

          borderWidth: 1,
          borderRadius: 16,
          borderColor: PALETTE.border,

          elevation: 2,
        }}
      >
        {/* Left */}
        <View
          style={{
            width: 80,
            aspectRatio: 1,

            justifyContent: 'center',
            alignItems: 'center',

            padding: 16,

            borderWidth: 1,
            borderRadius: 16,
          }}
        >
          <CategoryIcon category={props.category} size={36} />
        </View>

        {/* Right */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Title */}
            <Text
              numberOfLines={1}
              style={{ width: '70%', fontSize: 16, fontWeight: '600' }}
            >
              {props.title}
            </Text>

            {/* Remain */}
            <View
              style={{
                alignItems: 'center',
                paddingHorizontal: 12,
                borderWidth: 1,
                borderRadius: 16,
              }}
            >
              <Text style={{ fontSize: 13 }}>
                {getRemainingTime(props.closedAt)}
              </Text>
            </View>
          </View>

          {/* host */}
          <Text>방장: {props.host}</Text>

          {/* Member */}
          <View style={{ alignItems: 'flex-end', marginTop: 'auto' }}>
            <Text style={{ fontSize: 12 }}>
              {props.curMember}/{props.maxMember}
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

/* ==================== Style ==================== */
const styles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    paddingBottom: 16,

    height: 58,

    backgroundColor: PALETTE.background,
  },

  searchBar_container: {
    height: 42,

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 24,
    paddingHorizontal: 12,

    gap: 12,

    borderWidth: 1.5,
    borderRadius: 999,

    overflow: 'hidden',
  },

  search_textInput: {
    flex: 1,

    padding: 0,
    margin: 0,

    paddingVertical: 8,

    fontSize: 16,
  },

  meeting_flatListContent: {
    paddingVertical: 4,

    gap: 12,
  },

  create_pressable: {
    width: 48,

    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',

    bottom: 16,
    right: 16,

    aspectRatio: 1,

    backgroundColor: PALETTE.panel,

    borderWidth: 1,
    borderRadius: 16,

    elevation: 2,
  },

  create_pressable_1: {
    paddingHorizontal: 12,
    paddingVertical: 2,

    backgroundColor: PALETTE.panel,

    borderWidth: 1,
    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',
  },

  create_pressable_text: {
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
  },
});

/* ==================== Export ==================== */
export default MeetingListScreen;
