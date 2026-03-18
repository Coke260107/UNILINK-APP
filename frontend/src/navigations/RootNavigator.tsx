// src/navigations/RootNavigator.tsx

// Navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
// Component
import MainNavigator from './MainNavigator';
import CreateMeetingScreen from '../screens/home/CreateMeetingScreen';

// Type
import { RootStackParamList } from '../types/util/navigationType';
import { useAuth } from '../contexts/AuthContext';

// ==================== Main ==================== //
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { user } = useAuth();
  // 미로그인: 로그인 화면
  const isAuthenticated = !!user && user.userState == 'USER';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="MainTab" component={MainNavigator} />
          <Stack.Screen name="CreateMeeting" component={CreateMeetingScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

// ==================== Export ==================== //
export default RootNavigator;
