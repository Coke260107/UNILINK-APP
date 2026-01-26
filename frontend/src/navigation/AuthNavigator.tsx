import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import AuthScreen from '../screen/auth/AuthScreen';

// Type
import type { AuthStackParamList } from './type';
import SetNicknameScreen from '../screen/profile/SetNickNameScreen';

// ============================================================

// Main
const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          title: '',

          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'rgb(250, 250, 250)',
          },
        }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Name" component={SetNicknameScreen} />
      </Stack.Navigator>
    </>
  );
}
