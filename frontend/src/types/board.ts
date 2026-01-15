// board.ts

import { Category } from './category';

export type board = {
  id: number;
  category: Category;
  title: string;
  content: string;
  like: number;
  commentCount: number;
  comment: string;
  createdAt: string;
};
