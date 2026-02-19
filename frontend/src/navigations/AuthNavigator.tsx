// src/navigations/AuthNavigator.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import LoginScreen from '../screens/auth/LoginScreen';
import SetNicknameScreen from '../screens/auth/SetNicknameScreen';

// Type
import { AuthStackParamList } from '../types/navigationType';
import SetProfileScreen from '../screens/auth/SetProfileScreen';

/* ==================== Main ==================== */
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SetNickname" component={SetNicknameScreen} />
      <Stack.Screen name="SetProfile" component={SetProfileScreen} />
    </Stack.Navigator>
  );
};

/* ==================== Export ==================== */
export default AuthNavigator;
