// src/type/authType.ts

import { User, UserMetaData, UserState } from '../user/userType';

// ==================== Main ==================== //
export type LoginRequestType = string;

export type LoginResponseType = {
  userId: number;
  kakaoId: number;
  state: UserState;
  jwtToken: string;
};

export type RegisterRequestType = UserMetaData;

export type RegisterResponseType = User;
