// meeting.ts

// Type
import type { Category } from './category';
import type { User } from './user';

export type Meeting = {
  id: number;
  category: Category;
  title: string;
  host: User;
  maxMember: number;
  curMember: number;
  expireAt: string;
  like: number;
};
