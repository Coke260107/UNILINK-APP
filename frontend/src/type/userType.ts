// src/type/userType.ts

// Type
import { AgeType, GenderType, MbtiType } from './profileType';

// ==================== Enum Type ==================== //
export type UserRoleType = 'Guest' | 'User' | 'Banned';

export type User = {
  id: number;
  userRole: UserRoleType;
  nickname: string;
  gender: GenderType;
  mbti: MbtiType;
  age: AgeType;
  introduction?: string;
};
