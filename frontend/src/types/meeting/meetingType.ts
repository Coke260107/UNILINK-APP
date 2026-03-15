// src/types/meeting/meetingType.ts

export const CATEGORY = ['study', 'game', 'meal', 'exercise'] as const;
export type CategoryType = (typeof CATEGORY)[number];
export const CATEGORY_LABEL: Record<CategoryType, string> = {
  study: '스터디',
  game: '게임',
  meal: '식사',
  exercise: '운동',
};

export type PopularMeetingType = {
  meetingId: number;
  category: CategoryType;
  title: string;
  host: string;
  like: number;
  curMember: number;
  maxMember: number;
};

export type meeting = {
  meetingId: number;
  category: CategoryType;
  title: string;
  host: string;
  like: number;
  curMember: number;
  maxMember: number;
};
