import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Icon
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Screen
import HomeScreen from '../screen/home/HomeScreen';
import ChattingListScreen from '../screen/chat/ChatList';

// Type
import type { MainTabParamList } from './type';
import { StyleSheet, Text } from 'react-native';
import Colors from '../utility/color';

import {
  HomeScreenHeader,
  ChattingListHeader,
  ChattingListRightHeader,
} from '../header/header'
//===========================================================================

//Main

const Tab = createBottomTabNavigator<MainTabParamList>();
function MainTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShadowVisible: false, 
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },

        tabBarActiveTintColor: Colors.red,
        tabBarInactiveTintColor: Colors.guide,

        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.bottomTabBar,
        tabBarLabelStyle: { fontWeight: '600', fontSize: 11 },

        
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <HomeScreenHeader />,
          headerRight: () => <ChattingListRightHeader />,
          headerRightContainerStyle: { paddingRight: 12 },
          headerTitleAlign: 'left',

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
          headerTitle: () => <ChattingListHeader />,
          headerRight: () => <ChattingListRightHeader />,
          headerRightContainerStyle: { paddingRight: 12 },

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

export default MainTabNavigator;

//style
const styles = StyleSheet.create({
  bottomTabBar: {
    position: 'absolute',
    bottom: 4,
    left: 16,
    right: 16,
    
    height: 66,

    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 6,

    borderTopWidth: 0.2,
    },    
  })

























