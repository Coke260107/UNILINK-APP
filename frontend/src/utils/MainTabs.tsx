import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Screen
import HomeScreen from '../screens/HomeScreen';
import BackendPingTestScreen from '../screens/BackendPingTestScreen';

// Type
import type { MainTabParamList } from '../types/NavigationType';
import { StyleSheet, Text } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        // Header 스타일
        // 그림자 제거
        headerShadowVisible: false, // IOS
        headerStyle: {
          elevation: 0, // ANDROID
        },
      }}
    >
      <Tab.Screen
        name="BackendPingTest"
        component={BackendPingTestScreen}
        options={{
          // 아이콘 설정
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="broadcast-tower"
              iconStyle="solid"
              size={20}
              color={color}
            />
          ),

          // Header Setting
          headerTitle: () => <Text style={styles.title}>PING TEST</Text>,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // 하단 아이콘 설정
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="house"
              iconStyle="solid"
              size={20}
              color={color}
            />
          ),

          // 상단 바
          headerTitle: () => <Text style={styles.title}>UNILINK</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
