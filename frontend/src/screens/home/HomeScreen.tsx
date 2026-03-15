import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Component
import TitleSearchHeader from '../../components/headers/TitleSearchHeader';

// Type & Const
import {
  CATEGORY,
  CATEGORY_LABEL,
  CategoryType,
  PopularMeetingType,
} from '../../types/meeting/meetingType';

// Style
import PALETTE, { CATEGORY_PALETTE } from '../../utils/color';

// Utils
import CategoryIcon from '../../utils/Icon';
import { popularMeetingDummyData } from '../../dummy/popularMeetingDummyData';
import { BOARD_LABEL, PopularBoardType } from '../../types/board/boardType';
import { popularBoardDummyData } from '../../dummy/popularBoardDummyData';
import { HomeCalendar } from '../../components/calendar/Calendar';
import globalStyles from '../../utils/globalStyle';
/* ==================== Main ==================== */
const HomeScreen = () => {
  return (
    <>
      <SafeAreaView style={[globalStyles.safeAreaView]}>
        {/* Header */}
        <TitleSearchHeader title="UNILINK" />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Quick Search By Category */}
          <View style={[styles.quickSearchByCategory_Container]}>
            {CATEGORY.map(item => (
              <QuickSearchContent
                key={item}
                category={item}
                onPress={() => null}
              />
            ))}
          </View>
          {/* popular meeting */}
          <View style={[styles.popularMeeting_container]}>
            <View style={[styles.popularMeeting_top]}>
              <Text style={[styles.subTitle]}>인기 모임</Text>
              <ViewMore text="더보기" onPress={() => null} />
            </View>

            <FlatList
              data={popularMeetingDummyData}
              horizontal={true}
              renderItem={({ item }) => <PopularMeetingContent {...item} />}
              keyExtractor={item => item.meetingId.toString()}
              contentContainerStyle={[styles.popularMeeting_flatList_Content]}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {/* Popular Board */}
          <View style={[styles.popularBoard_top]}>
            <Text style={[styles.subTitle]}>인기 게시물</Text>
            <ViewMore text="더보기" onPress={() => null} />
          </View>

          <View style={[styles.popularBoardList_conatiner]}>
            {popularBoardDummyData.map(item => (
              <PopularBoardContent
                key={item.boardId}
                boardId={item.boardId}
                boardType={item.boardType}
                title={item.title}
              />
            ))}
          </View>

          {/* Calendar */}
          <View style={[styles.calendar_container]}>
            <View style={[styles.calendar_top]}>
              <Text style={[styles.subTitle]}>캘린더</Text>
              <ViewMore text="자세히 보기" onPress={() => null} />
            </View>

            <HomeCalendar />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

/* ==================== Component ==================== */
type ViewMoreType = {
  text: string;
  onPress: () => void;
};
const ViewMore = ({ text, onPress }: ViewMoreType) => {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Text style={{ fontSize: 14, color: PALETTE.text_guide }}>{text}</Text>
        <FontAwesome6 name="chevron-right" iconStyle="solid" size={12} />
      </Pressable>
    </>
  );
};

type QuickSearchContentProps = {
  onPress: () => void;
  category: CategoryType;
};
const QuickSearchContent = ({ onPress, category }: QuickSearchContentProps) => {
  return (
    <Pressable
      style={{
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 8,
        borderWidth: 1.5,
        borderColor: PALETTE.border,
        borderRadius: 12,
        backgroundColor: PALETTE.panel,
      }}
      onPress={onPress}
    >
      <CategoryIcon
        category={category}
        viewStyle={{ alignSelf: 'flex-start' }}
      />
      <Text style={{ alignSelf: 'flex-end', fontWeight: '600' }}>
        {CATEGORY_LABEL[category]}
      </Text>
    </Pressable>
  );
};

const PopularMeetingContent = (props: PopularMeetingType) => {
  return (
    <Pressable
      key={props.meetingId}
      style={{
        width: 225,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: PALETTE.panel,
        borderWidth: 1.5,
        borderColor: PALETTE.border,
        borderRadius: 12,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <CategoryIcon category={props.category} />
        <Text
          style={{ flex: 1, fontSize: 15, fontWeight: '600' }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {props.title}
        </Text>
      </View>
      <Text style={{ marginBottom: 48 }}>방장: {props.host}</Text>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <FontAwesome6 name="heart" iconStyle="regular" />
          <Text>{props.like}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <FontAwesome6 name="user-group" iconStyle="solid" />
          <Text>
            {props.curMember}/{props.maxMember}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const PopularBoardContent = (props: PopularBoardType) => {
  return (
    <Pressable style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Text style={{ fontSize: 14, fontWeight: '600' }}>
        {BOARD_LABEL[props.boardType]}게시판
      </Text>
      <Text>{props.title}</Text>
    </Pressable>
  );
};
/* ==================== Styles ==================== */
const styles = StyleSheet.create({
  // Public
  safeAreaView: {
    flex: 1,
    backgroundColor: PALETTE.background,
  },

  subTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },

  // Header
  header_container: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    paddingBottom: 16,

    backgroundColor: PALETTE.background,
  },

  // Quick Search By Category
  quickSearchByCategory_Container: {
    flexDirection: 'row',

    gap: 8,

    marginTop: 4,
    marginBottom: 24,
  },

  // popular meeting
  popularMeeting_container: {
    marginBottom: 24,
  },

  popularMeeting_top: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 4,
  },

  popularMeeting_flatList_Content: {
    gap: 8,
  },

  // popular borad
  popularBoard_top: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 4,
  },

  popularBoardList_conatiner: {
    paddingHorizontal: 12,
    paddingVertical: 8,

    marginBottom: 24,

    gap: 8,

    backgroundColor: PALETTE.panel,

    borderWidth: 1.5,
    borderColor: PALETTE.border,
    borderRadius: 12,
  },

  // Calender
  calendar_container: {},

  calendar_top: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 4,
  },
});

/* ==================== Export ==================== */
export default HomeScreen;
