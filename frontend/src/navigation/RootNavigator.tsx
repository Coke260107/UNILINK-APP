import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Type
import { RootStackParamList } from './type';
import AuthNavigator from './AuthNavigator';

// ============================================================

// Main
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="AuthNavigator"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      </Stack.Navigator>
    </>
  );
}
