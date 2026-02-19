// src/contexts/AuthContext.tsx

import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { UserState } from '../types/userType';

// Type
type AuthContextType = {
  userToken: string | null;
  userState: UserState | null;
  login: (token: string, state: UserState) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

// ==================== Main ==================== //

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userState, setUserState] = useState<UserState | null>(null);
  const pendingTokenRef = useRef<string | null>(null);

  const login = (token: string, state: UserState) => {
    setUserToken(token);
    setUserState(state);
  };

  const logout = () => {
    setUserToken(null);
    setUserState(null);
    pendingTokenRef.current = null;
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userState,
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
