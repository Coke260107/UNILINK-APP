import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Screen
import HomeScreen from '../screens/HomeScreen';
import BackendPingTestScreen from '../screens/BackendPingTestScreen';

// Type
import type { MainTabParamList } from '../types/navigation';
import { StyleSheet, Text } from 'react-native';
import Colors from './color';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // Tab Setting
        tabBarActiveTintColor: Colors.main,

        // Header 스타일
        // 그림자 제거
        headerShadowVisible: false, // IOS
        headerStyle: {
          backgroundColor: 'rgb(250, 250, 250)', // Neutral-50
          elevation: 0, // ANDROID
        },
        tabBarStyle: {
          backgroundColor: 'rgb(250, 250, 250)', // Neutral-50
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
          // 상단 바
          headerRightContainerStyle: {
            alignItems: 'center',

            paddingRight: 12,
          },

          headerTitle: () => <Text style={styles.title}>UNILINK</Text>,

          // headerRight: () => (
          //   <Pressable style={styles.login_button}>
          //     <Text style={styles.login_button_text}>로그인</Text>
          //   </Pressable>
          // ),

          // 하단 아이콘 설정
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="house"
              iconStyle="solid"
              size={20}
              color={color}
            />
          ),

          tabBarLabel: '홈',
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
