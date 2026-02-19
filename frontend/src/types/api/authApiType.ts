// src/type/authType.ts

import { UserState } from '../userType';

// ==================== Main ==================== //
export type LoginRequestType = string;

export type LoginResponseType = {
  userId: number;
  kakaoId: number;
  state: UserState;
  jwtToken: string;
};
