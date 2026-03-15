// src/navigation/MainNavigator.tsx

import { MainStackParamList } from '../types/util/navigationType';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screen
import HomeScreen from '../screens/home/HomeScreen';
import { StyleSheet, Text } from 'react-native';
import PALETTE from '../utils/color';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import ChattingListScreen from '../screens/home/ChattingListScreen';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import MeetingListScreen from '../screens/home/MeetingListScreen';

/* ==================== Main ==================== */

const Tab = createBottomTabNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: PALETTE.background, height: 56 },
        animation: 'fade',
      }}
    >
      <Tab.Screen
        name="MeetingList"
        component={MeetingListScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome6 name="user-group" iconStyle="solid" size={20} />
          ),
          tabBarLabel: () => <Text style={{ fontSize: 12 }}>모임</Text>,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome6 name="house" iconStyle="solid" size={20} />
          ),
          tabBarLabel: () => <Text style={{ fontSize: 12 }}>홈</Text>,
        }}
      />
      <Tab.Screen
        name="ChattingList"
        component={ChattingListScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="comments" iconStyle="solid" size={20} />
          ),
          tabBarLabel: () => <Text style={{ fontSize: 12 }}>채팅</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

/* ==================== Styles ==================== */

/* ==================== Export ==================== */
export default MainNavigator;
