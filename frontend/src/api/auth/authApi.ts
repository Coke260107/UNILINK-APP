// src/api/auth/authApi.ts

// Type
import Api from '../../utils/axios';
import {
  LoginRequestType,
  LoginResponseType,
} from '../../types/api/authApiType';

/* ==================== Main ==================== */
export const login = async (
  kakaoAccessToken: LoginRequestType,
): Promise<LoginResponseType> => {
  try {
    if (!kakaoAccessToken) {
      console.error('[login] kakaoAccessToken is null');
      throw new Error();
    }

    const response = await Api.post('/api/user/login', {
      accessToken: kakaoAccessToken,
    });
    const data: LoginResponseType = response.data;
    return data;
  } catch (error: any) {
    console.error('[login] ', error);
    throw new Error();
  }
};

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
