// src/navigation/RootNavigator.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context
import useAuth from '../context/auth/useAuth';

// Type
import { RootStackParamList } from './type';
import AuthNavigator from './AuthNavigator';
import TestScreen from '../screen/test/TestScreen';

// ============================================================

// Main
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) return;

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={TestScreen} />
        ) : (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </>
  );
};

// ==================== Export ==================== //
export default RootNavigator;
