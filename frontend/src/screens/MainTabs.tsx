import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Screen
import HomeScreen from './HomeScreen';

// Type
import type { MainTabParamList } from '../types/NavigationType';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome6
            name="house"
            iconStyle="solid"
            size={size}
            color={color}
          />
        ),
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default MainTab;
