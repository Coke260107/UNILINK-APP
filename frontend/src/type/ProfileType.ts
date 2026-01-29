// ProfileType.ts

// ==================== Gender ==================== //
export type GenderType = 'MALE' | 'FEMALE' | 'OTHER' | 'PRIVATE';

export const GENDER_ORDER: readonly GenderType[] = [
  'MALE',
  'FEMALE',
  'OTHER',
  'PRIVATE',
] as const;

export const GENDER_LABEL: Record<GenderType, { label: string }> = {
  MALE: { label: '남성' },
  FEMALE: { label: '여성' },
  OTHER: { label: '기타' },
  PRIVATE: { label: '공개 안 함' },
};

export type GenderItem = {
  value: GenderType;
  label: string;
};

export const GENDER_OPTION: readonly GenderItem[] = GENDER_ORDER.map(
  gender => ({
    value: gender,
    label: GENDER_LABEL[gender].label,
  }),
);

// ==================== MBTI ==================== //
export type MbtiType =
  | 'ENFJ'
  | 'ENFP'
  | 'ENTJ'
  | 'ENTP'
  | 'ESFJ'
  | 'ESFP'
  | 'ESTJ'
  | 'ESTP'
  | 'INFJ'
  | 'INFP'
  | 'INTJ'
  | 'INTP'
  | 'ISFJ'
  | 'ISFP'
  | 'ISTJ'
  | 'ISTP'
  | 'PRIVATE';

export const MBTI_ORDER: readonly MbtiType[] = [
  'ENFJ',
  'ENFP',
  'ENTJ',
  'ENTP',
  'ESFJ',
  'ESFP',
  'ESTJ',
  'ESTP',
  'INFJ',
  'INFP',
  'INTJ',
  'INTP',
  'ISFJ',
  'ISFP',
  'ISTJ',
  'ISTP',
  'PRIVATE',
] as const;

export const MBTI_LABEL: Record<MbtiType, { label: string }> = {
  ENFJ: { label: 'ENFJ' },
  ENFP: { label: 'ENFP' },
  ENTJ: { label: 'ENTJ' },
  ENTP: { label: 'ENTP' },
  ESFJ: { label: 'ESFJ' },
  ESFP: { label: 'ESFP' },
  ESTJ: { label: 'ESTJ' },
  ESTP: { label: 'ESTP' },
  INFJ: { label: 'INFJ' },
  INFP: { label: 'INFP' },
  INTJ: { label: 'INTJ' },
  INTP: { label: 'INTP' },
  ISFJ: { label: 'ISFJ' },
  ISFP: { label: 'ISFP' },
  ISTJ: { label: 'ISTJ' },
  ISTP: { label: 'ISTP' },
  PRIVATE: { label: '공개 안 함' },
};

export type MbtiItem = {
  value: MbtiType;
  label: string;
};

export const MBTI_OPTION: readonly MbtiItem[] = MBTI_ORDER.map(mbti => ({
  value: mbti,
  label: MBTI_LABEL[mbti].label,
}));

// ==================== Age ==================== //
export type AgeType =
  | 'AGE_10'
  | 'AGE_20'
  | 'AGE_30'
  | 'AGE_40'
  | 'AGE_50'
  | 'AGE_60'
  | 'PRIVATE';

export const AGE_ORDER: readonly AgeType[] = [
  'AGE_10',
  'AGE_20',
  'AGE_30',
  'AGE_40',
  'AGE_50',
  'AGE_60',
  'PRIVATE',
] as const;

export const AGE_LABEL: Record<AgeType, { label: string }> = {
  AGE_10: { label: '10대' },
  AGE_20: { label: '20대' },
  AGE_30: { label: '30대' },
  AGE_40: { label: '40대' },
  AGE_50: { label: '50대' },
  AGE_60: { label: '60대 이상' },
  PRIVATE: { label: '공개 안 함' },
};

export type AgeItem = {
  value: AgeType;
  label: string;
};

export const AGE_OPTION: readonly AgeItem[] = AGE_ORDER.map(age => ({
  value: age,
  label: AGE_LABEL[age].label,
}));
