import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

// Screen
import AuthScreen from '../screen/auth/AuthScreen';

// Type
import type { AuthStackParamList, RootStackParamList } from './type';
import SetNicknameScreen from '../screen/profile/SetNickNameScreen';
import SetUserMetaData0Screen from '../screen/profile/SetUserProfileScreen';
type Props = NativeStackScreenProps<RootStackParamList, 'AuthNavigator'>;

// ==================== Main ==================== //
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = ({ route }: Props) => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Name" component={SetNicknameScreen} />
        <Stack.Screen name="UserMetaData0" component={SetUserMetaData0Screen} />
      </Stack.Navigator>
    </>
  );
};

// ==================== Export ==================== //
export default AuthNavigator;
