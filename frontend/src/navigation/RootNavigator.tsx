import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';

// Type
import { RootStackParamList } from './type';
import AuthNavigator from './AuthNavigator';
import HomeScreen from '../screen/home/HomeScreen';
// ============================================================

// Main
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  
  return (
    <>
      <Stack.Navigator
        initialRouteName="MainTab"
        screenOptions={{ headerShown: false }}
      >
         <Stack.Screen name="MainTab" component={MainTabNavigator} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      </Stack.Navigator>
    </>
  );
}


