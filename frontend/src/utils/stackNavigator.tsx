import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Screen
import AuthScreen from '../screens/auth/AuthScreen';
import MainTab from './tabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default StackNavigator;
