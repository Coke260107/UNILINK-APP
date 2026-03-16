// src/navigations/RootNavigator.tsx

// Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
// Component
import MainNavigator from './MainNavigator';
import CreateMeetingScreen from '../screens/home/CreateMeetingScreen';

// Type
import { RootStackParamList } from '../types/util/navigationType';

// ==================== Main ==================== //
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  // 미로그인: 로그인 화면
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainNavigator} />
      <Stack.Screen name="CreateMeeting" component={CreateMeetingScreen} />
    </Stack.Navigator>
  );
};

// ==================== Export ==================== //
export default RootNavigator;
