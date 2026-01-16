import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Icon
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Screen
import HomeScreen from '../screens/home/HomeScreen';
import ChattingListScreen from '../screens/chattingList/ChattingListScreen';

// Type
import type { MainTabParamList } from '../types/navigation';
import { StyleSheet, Text } from 'react-native';
import Colors from './color';

// Component
import {
  HomeScreenTitle,
  ChattingListTitle,
  ChattingListRightHeader,
} from '../components/main_tab/headers';

const Tab = createBottomTabNavigator<MainTabParamList>();
function MainTab() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // Header Style
        headerShadowVisible: false, // IOS
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },

        // TabBar Style
        tabBarActiveTintColor: Colors.main, // Active Color
        tabBarStyle: {
          backgroundColor: Colors.background, // Background Color

          borderWidth: 1,
          borderColor: Colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <HomeScreenTitle />,

          tabBarLabel: '홈',
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="house"
              iconStyle="solid"
              size={16}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ChattingList"
        component={ChattingListScreen}
        options={{
          // Header Style
          headerTitle: () => <ChattingListTitle />,
          headerRight: () => <ChattingListRightHeader />,

          // TabBar Style
          tabBarLabel: '채팅',
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="comments"
              iconStyle="solid"
              size={16}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;

const styles = StyleSheet.create({
  title: {
    color: Colors.main,
    fontSize: 24,
    fontWeight: 'bold',
  },

  login_button: {
    paddingVertical: 6,
    paddingHorizontal: 16,

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: 'rgb(229, 229, 229)', // Neutral-300
    borderRadius: 999,
  },

  login_button_text: {
    fontWeight: '600',
  },
});
