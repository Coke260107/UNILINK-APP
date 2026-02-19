// src/types/userType.ts

/* ==================== UserState ==================== */
export type UserState = 'GUEST' | 'USER' | 'ADMIN';

// ==================== Gender ==================== //
const GENDER = ['MALE', 'FEMALE', 'OTHER', 'PRIVATE'] as const;

export type GenderType = (typeof GENDER)[number];

export const GENDER_LABEL: Record<GenderType, string> = {
  MALE: '남성',
  FEMALE: '여성',
  OTHER: '기타',
  PRIVATE: '선택 안 함',
};

type GenderItemType = {
  label: string;
  value: GenderType;
};

export const GENDER_OPTION: readonly GenderItemType[] = GENDER.map(gender => ({
  value: gender,
  label: GENDER_LABEL[gender],
}));

// ==================== MBTI ==================== //
const MBTI = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
  'PRIVATE',
] as const;

export type MbtiType = (typeof MBTI)[number];

export const MBTI_LABEL: Record<MbtiType, string> = {
  INTJ: 'INTJ',
  INTP: 'INTP',
  ENTJ: 'ENTJ',
  ENTP: 'ENTP',
  INFJ: 'INFJ',
  INFP: 'INFP',
  ENFJ: 'ENFJ',
  ENFP: 'ENFP',
  ISTJ: 'ISTJ',
  ISFJ: 'ISFJ',
  ESTJ: 'ESTJ',
  ESFJ: 'ESFJ',
  ISTP: 'ISTP',
  ISFP: 'ISFP',
  ESTP: 'ESTP',
  ESFP: 'ESFP',
  PRIVATE: '선택 안 함',
};

type MbtiItemType = {
  label: string;
  value: MbtiType;
};

export const MBTI_OPTION: readonly MbtiItemType[] = MBTI.map(mbti => ({
  value: mbti,
  label: MBTI_LABEL[mbti],
}));

// ==================== Age ==================== //
const AGE = ['TEEN', 'TWENTIES', 'THIRTIES', 'PRIVATE'] as const;

export type AgeType = (typeof AGE)[number];

export const AGE_LABEL: Record<AgeType, string> = {
  TEEN: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대 이상',
  PRIVATE: '선택 안 함',
};

type AgeItemType = {
  label: string;
  value: AgeType;
};

export const AGE_OPTION: readonly AgeItemType[] = AGE.map(age => ({
  value: age,
  label: AGE_LABEL[age],
}));
