// meeting.ts

// Type
import type { Category } from './category';
import type { User } from './user';

export type Meeting = {
  id: number;
  category: Category;
  title: string;
  host: User;
  like: number;
  maxMember: number;
  curMember: number;
  expireAt: string;

};
