// src/contexts/AuthContext.tsx

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { User, UserMetaData, UserState } from '../types/user/userType';
import { saveJwtToken, getJwtToken } from '../utils/keychain';

// Api
import { login as appLogin } from '../api/auth/authApi';

// Debug
import * as keychain from 'react-native-keychain';

// Type
type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateUserMetaData: (newDate: Partial<UserMetaData>) => void;
  login: (token: string) => Promise<User>;
};

type AuthProviderProps = {
  children: ReactNode;
};

// ==================== Main ==================== //

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUserMetaData = useCallback(
    (newData: Partial<User>) => {
      if (!user) {
        throw new Error(
          '로그인된 사용자 정보가 없어 프로필을 수정할 수 없습니다.',
        );
      }

      setUser(prev => {
        if (!prev) {
          throw new Error(
            '로그인된 사용자 정보가 없어 프로필을 수정할 수 없습니다.',
          );
        }

        return {
          ...prev,
          ...newData,
        };
      });
    },
    [user],
  );

  const login = async (kakaoAccessToken: string): Promise<User> => {
    try {
      const data = await appLogin(kakaoAccessToken);

      const user: User = {
        userId: data.userId,
        userState: data.state,
        jwtToken: data.jwtToken,
      };

      await saveJwtToken({ userId: user.userId, token: user.jwtToken });
      return user;
    } catch (error: any) {
      throw error;
    }
  };

  // Debug Handle
  const handleResetJWTToken = async () => {
    try {
      await keychain.resetGenericPassword({ service: 'unilink_jwtToken' });
      if (__DEV__) {
        console.log('[keychain] Complete Reset JWT token in storage');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // useEffect
  useEffect(() => {
    const initialize = async () => {
      try {
        const savedJwtToken = await getJwtToken();

        if (!savedJwtToken) {
          setUser(null);
          console.log(`[AuthContext] jwt Token not found`);
          return;
        }

        // Login
        // appLogin(savedJwtToken);
      } catch (error: any) {
        if (__DEV__)
          console.error(`[AuthContext] initialize failed\n ${error.message}`);
      }
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        updateUserMetaData,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ==================== Export ==================== //
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
