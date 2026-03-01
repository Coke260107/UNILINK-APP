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

// Type
type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateUserMetaData: (newDate: Partial<UserMetaData>) => void;
  login: (token: string, state: UserState) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

// ==================== Main ==================== //

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const pendingTokenRef = useRef<string | null>(null);

  // Handle
  const handleInitialize = useCallback(async () => {
    try {
    } catch (error: any) {
      console.error(error.message);
    }
  }, []);

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

  const login = (token: string, state: UserState) => {};

  const logout = () => {
    pendingTokenRef.current = null;
  };

  // useEffect
  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        updateUserMetaData,
        login,
        logout,
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
