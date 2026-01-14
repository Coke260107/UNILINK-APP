// meeting.ts

// Type
import type { Category } from './category';
import type { User } from './user';

export type Meeting = {
  id: number;
  title: string;
  category: Category;
  maxMember: number;
  curMember: number;
  expireAt: string;
  host: User;
};
