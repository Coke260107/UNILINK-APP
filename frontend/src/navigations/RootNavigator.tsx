// src/navigations/RootNavigator.tsx

import { useAuth } from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import RegistrationNavigator from './RegistrationNavigator';
import { Text } from 'react-native';

// ==================== Main ==================== //

const RootNavigator = () => {
  const { userToken, userState } = useAuth();

  // 미로그인: 로그인 화면
  return <AuthNavigator />;
};

// ==================== Export ==================== //
export default RootNavigator;
