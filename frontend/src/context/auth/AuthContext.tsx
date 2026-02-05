import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import BootSplash from 'react-native-bootsplash';

// Api
import * as Keychain from '../../utility/keychain';
import * as AuthApi from '../../api/authApi';

// Type
import { User, UserRoleType } from '../../type/userType';
import * as AuthType from '../../type/authType';
import { hasGenericPassword } from 'react-native-keychain';
import { useRoute } from '@react-navigation/native';

export type Props = {
  jwtToken: string | null;
  user: User | null;
  loading: boolean;

  login: () => void;
  logout: () => void;
};

// ==================== Main ==================== //
export const AuthContext = createContext<Props | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuthInitialize = useCallback(async () => {
    try {
      if (loading) return;
      setLoading(true);

      const storedJwtToken = await Keychain.getJwtToken();

      if (!storedJwtToken) {
        BootSplash.hide();
        return;
      }

      const data = await AuthApi.Auth(storedJwtToken);

      if (__DEV__)
        console.log(`[handleAuthInitialize] userRole is ${data.userRole}`);

      if (data.userRole === 'Guest') {
        Keychain.deleteJwtToken();
        return;
      }

      console.log(`[handleAuthInitialize] ${data.userRole}`);
      await login();
      BootSplash.hide();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async () => {
    try {
      const storedToken = await Keychain.getJwtToken();

      if (!storedToken) {
        return;
      }

      const user = await AuthApi.Login(storedToken);

      setJwtToken(storedToken);
      setUser(user);
    } catch (error: any) {
      console.error(`[login] ${error.message}`);
      throw new Error('로그인 오류가 발생했습니다. 다시 시도해 주세요!');
    }
  }, []);

  const logout = useCallback(() => {
    setJwtToken(null);
    setUser(null);
  }, []);

  // Effect
  useEffect(() => {
    handleAuthInitialize();
  }, []);

  const value = useMemo(
    () => ({
      jwtToken,
      user,
      loading,
      login,
      logout,
    }),
    [setJwtToken, user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
