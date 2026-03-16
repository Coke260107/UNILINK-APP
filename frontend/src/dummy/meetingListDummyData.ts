// src/dummy/meetingListDummyData.ts

import { CategoryType } from '../types/meeting/meetingType';

type MeetingCardData = {
  meetingId: number;
  category: CategoryType;
  title: string;
  host: string;
  curMember: number;
  maxMember: number;
  closedAt: string;
};

export const meetingListDummyData: MeetingCardData[] = [
  {
    meetingId: 1,
    category: 'study',
    title: '토익 900점 같이 준비해요',
    host: '김공부',
    curMember: 4,
    maxMember: 6,
    closedAt: '2026-03-15T23:59:00',
  },
  {
    meetingId: 2,
    category: 'study',
    title: '알고리즘 코딩테스트 스터디',
    host: '박코딩',
    curMember: 3,
    maxMember: 5,
    closedAt: '2026-03-20T18:00:00',
  },

  {
    meetingId: 3,
    category: 'game',
    title: '롤 같이 랭겜 돌리실 분',
    host: '이챌린저',
    curMember: 2,
    maxMember: 5,
    closedAt: '2026-03-11T22:00:00',
  },
  {
    meetingId: 4,
    category: 'game',
    title: '보드게임 카페 같이 가실 분!',
    host: '최보드',
    curMember: 5,
    maxMember: 8,
    closedAt: '2026-03-13T14:00:00',
  },

  // MEAL - 식사
  {
    meetingId: 5,
    category: 'meal',
    title: '학식 같이 먹어요 (11시 30분)',
    host: '정밥먹자',
    curMember: 2,
    maxMember: 4,
    closedAt: '2026-03-10T11:00:00',
  },
  {
    meetingId: 6,
    category: 'meal',
    title: '근처 스시 맛집 같이 가실 분',
    host: '한먹부기',
    curMember: 3,
    maxMember: 4,
    closedAt: '2026-03-12T18:30:00',
  },

  // EXERCISE - 운동
  {
    meetingId: 7,
    category: 'exercise',
    title: '아침 6시 러닝 같이해요',
    host: '오러닝',
    curMember: 6,
    maxMember: 10,
    closedAt: '2026-03-14T06:00:00',
  },
  {
    meetingId: 8,
    category: 'exercise',
    title: '교내 헬스장 같이 다닐 분',
    host: '권헬스',
    curMember: 2,
    maxMember: 3,
    closedAt: '2026-03-18T20:00:00',
  },
];
