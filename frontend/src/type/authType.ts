// src/type/authType.ts

// Type
import { User, UserRoleType } from './userType';

export type SetTokenRequestType = {
  key: string;
  token: string;
  service: string;
};

export type GetTokenResponseType = {
  token: string;
};

// ==================== RegisterGuestToken ==================== //
export type RegisterGuestTokenRequest = {
  kakaoAccessToken: string;
};

export type RegisterGuestTokenResponse = {
  accessToken: string;
  userId: number;
};

// ==================== Auth API ==================== //

export type AuthResponseType = {
  userRole: UserRoleType;
};

export type RegisterResponseType = {
  jwtToken: string;
  userRole: UserRoleType;
};
