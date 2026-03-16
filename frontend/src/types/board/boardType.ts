// src/types/board/boardType.ts

export type BoardType = 'NORMAL' | 'PROMOTION';

export const BOARD_LABEL: Record<BoardType, string> = {
  NORMAL: '자유',
  PROMOTION: '홍보',
};

export type PopularBoardType = {
  boardType: BoardType;
  boardId: number;
  title: string;
};
