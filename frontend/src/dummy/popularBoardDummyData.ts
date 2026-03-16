// src/dummy/popularBoardDummyData.ts

import { PopularBoardType } from '../types/board/boardType';

export const popularBoardDummyData: PopularBoardType[] = [
  // NORMAL - 일반
  {
    boardId: 1,
    boardType: 'NORMAL',
    title: '기말고사 족보 공유합니다',
  },
  {
    boardId: 2,
    boardType: 'NORMAL',
    title: '자취방 구할 때 주의할 점 정리',
  },
  {
    boardId: 3,
    boardType: 'NORMAL',
    title: '오늘 학식 메뉴 진짜 맛있다',
  },

  // PROMOTION - 홍보
  {
    boardId: 4,
    boardType: 'PROMOTION',
    title: '중앙 동아리 "코딩클럽" 신입 모집 중!',
  },
  {
    boardId: 5,
    boardType: 'PROMOTION',
    title: '교내 헬스 소모임 같이 하실 분 구해요',
  },
  {
    boardId: 6,
    boardType: 'PROMOTION',
    title: '학생회 봄 축제 공연 팀 모집합니다',
  },
];
