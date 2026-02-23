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
