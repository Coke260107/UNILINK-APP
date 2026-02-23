// src/api/user/userApi.ts
import Api from '../../utils/axios';

export const CheckNicknameDuplication = async (
  nickname: string,
): Promise<boolean | null> => {
  try {
    if (!nickname) return null;

    const response = await Api.get('api/user/duplicate', {
      params: { nickname },
    });

    return response.data.valid;
  } catch (error: any) {
    console.error(error);
    throw new Error('오류가 발생했습니다.');
  }
};
