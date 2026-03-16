// src/api/auth/authApi.ts

// Type
import Api, { ApiWithJwt } from '../../utils/axios';
import * as AuthApiType from '../../types/api/authApiType';

/* ==================== Main ==================== */
export const login = async (
  kakaoAccessToken: AuthApiType.LoginRequestType,
): Promise<AuthApiType.LoginResponseType> => {
  try {
    if (!kakaoAccessToken) {
      console.error('[login] kakaoAccessToken is null');
      throw new Error();
    }

    const response = await Api.post('/api/user/login', {
      accessToken: kakaoAccessToken,
    });
    const data: AuthApiType.LoginResponseType = response.data;
    return data;
  } catch (error: any) {
    console.error('[login] ', error);
    throw new Error();
  }
};

export const Register = async (
  requestData: AuthApiType.RegisterRequestType,
): Promise<AuthApiType.RegisterResponseType> => {
  try {
    if (!requestData)
      throw new Error('잘못된 요청값 입니다. 다시 시도해 주세요');

    const res = await ApiWithJwt.post(`/api/user/profile`, requestData);
    const responseData: AuthApiType.RegisterResponseType = res.data;
    return responseData;
  } catch (error: any) {
    if (__DEV__) console.error(`[Register] `, error.message);
    throw new Error(error.message);
  }
};
