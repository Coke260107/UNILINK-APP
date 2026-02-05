// src/api/profileApi.ts
import client from '../utility/client';

export const CheckNickname = async (nickname: string): Promise<boolean> => {
  /* 사용 코드
  const response = await client.get('/profile/check_nickanme', {
    params: { nickname },
  });

  return response.data;
  */

  /* 테스트 코드 (2초 Delay) */
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
  console.log(`${nickname} 등록 완료`);
  return false;
};
