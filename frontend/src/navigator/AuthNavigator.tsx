// Type
import type { AuthStackParamList } from '../type/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import AuthScreen from '../screen/auth/AuthScreen';
import SignupNameScreen from '../screen/profile/SignupName';
import { SingleBackHeader } from '../component/headers/Header';
import Colors from '../utility/color';

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
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
        <Stack.Screen name="Name" component={SignupNameScreen} />
      </Stack.Navigator>
    </>
  );
}

export default AuthStackNavigator;
