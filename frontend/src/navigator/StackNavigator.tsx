import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type/navigation';

// Screen
import MainTab from './MainTabNavigator';

// Navigator
import AuthStackNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
        <Stack.Screen name="MainTab" component={MainTab} />
      </Stack.Navigator>
    </>
  );
}

export default StackNavigator;
