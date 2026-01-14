import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import MainTab from './tabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="mainTab"
          component={MainTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default StackNavigator;
