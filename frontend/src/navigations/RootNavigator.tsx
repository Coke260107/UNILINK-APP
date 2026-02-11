// src/navigations/RootNavigator.tsx

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigationType";

// Screen
import LoginScreen from "../screens/auth/LoginScreen";

// ==================== Main ==================== //
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
      <Stack.Screen name='Login' component={LoginScreen}/>
    </Stack.Navigator>
  )
}

// ==================== Export ==================== //
export default RootNavigator;