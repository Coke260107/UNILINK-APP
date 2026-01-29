import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import AuthScreen from '../screen/auth/AuthScreen';

// Type
import type { AuthStackParamList } from './type';
import SetNicknameScreen from '../screen/profile/SetNickNameScreen';
import { Color } from '../../globalStyle';
import SetUserMetaData0Screen from '../screen/profile/SetUserMetaData0Screen';

// ============================================================

// Main
const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Name" component={SetNicknameScreen} />
        <Stack.Screen name="UserMetaData0" component={SetUserMetaData0Screen} />
      </Stack.Navigator>
    </>
  );
}
