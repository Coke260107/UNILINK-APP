export const CATEGORY_VALUE = ['study', 'game', 'meal', 'exercise'] as const;
export type Category = (typeof CATEGORY_VALUE)[number];
export const CATEGORY_LABEL = {
  study: '공부',
  game: '게임',
  meal: '식사',
  exercise: '운동',
} as const satisfies Record<Category, string>;
