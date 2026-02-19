// src/navigations/RegistrationNavigator.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import SetNicknameScreen from '../screens/auth/SetNicknameScreen';
import SetProfileScreen from '../screens/auth/SetProfileScreen';

// Type
import { RegistrationStackParamList } from '../types/navigationType';

/* ==================== Main ==================== */
const Stack = createNativeStackNavigator<RegistrationStackParamList>();

const RegistrationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SetNickname"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SetNickname" component={SetNicknameScreen} />
      <Stack.Screen name="SetProfile" component={SetProfileScreen} />
    </Stack.Navigator>
  );
};

/* ==================== Export ==================== */
export default RegistrationNavigator;
