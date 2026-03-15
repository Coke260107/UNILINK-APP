// src/dummy/popularMeetingDummyDate.ts

import { PopularMeetingType } from '../types/meeting/meetingType';

export const popularMeetingDummyData: PopularMeetingType[] = [
  // STUDY - 스터디
  {
    meetingId: 1,
    category: 'study',
    title: '토익 900점 같이 준비해요',
    host: '김공부',
    like: 34,
    curMember: 4,
    maxMember: 6,
  },
  {
    meetingId: 2,
    category: 'study',
    title: '알고리즘 코딩테스트 스터디',
    host: '박코딩',
    like: 28,
    curMember: 3,
    maxMember: 5,
  },

  // GAME - 게임
  {
    meetingId: 3,
    category: 'game',
    title: '롤 같이 랭겜 돌리실 분',
    host: '이챌린저',
    like: 52,
    curMember: 2,
    maxMember: 5,
  },
  {
    meetingId: 4,
    category: 'game',
    title: '보드게임 카페 같이 가실 분!',
    host: '최보드',
    like: 19,
    curMember: 5,
    maxMember: 8,
  },

  // MEAL - 식사
  {
    meetingId: 5,
    category: 'meal',
    title: '학식 같이 먹어요 (11시 30분)',
    host: '정밥먹자',
    like: 41,
    curMember: 2,
    maxMember: 4,
  },
  {
    meetingId: 6,
    category: 'meal',
    title: '근처 스시 맛집 같이 가실 분',
    host: '한먹부기',
    like: 33,
    curMember: 3,
    maxMember: 4,
  },

  // EXERCISE - 운동
  {
    meetingId: 7,
    category: 'exercise',
    title: '아침 6시 러닝 같이해요',
    host: '오러닝',
    like: 25,
    curMember: 6,
    maxMember: 10,
  },
  {
    meetingId: 8,
    category: 'exercise',
    title: '교내 헬스장 같이 다닐 분',
    host: '권헬스',
    like: 47,
    curMember: 2,
    maxMember: 3,
  },
];
