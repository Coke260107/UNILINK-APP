import * as Keychain from 'react-native-keychain';

// Type
import * as KeychainType from '../types/util/keychainType';
import { AppError } from './error';

export const saveJwtToken = async (
  requestData: KeychainType.SaveJwtTokenRequestType,
) => {
  const userId = requestData.userId;
  const jwtToken = requestData.token;

  try {
    await Keychain.setGenericPassword(userId.toString(), jwtToken, {
      service: 'unilink_jwtToken',
      securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
    });
  } catch (error: any) {
    console.error(`[saveJwtToken] `, error.message);
    throw new Error('권한 설정 중 오류가 발생했습니다.');
  }
};

export const getJwtToken =
  async (): Promise<KeychainType.GetJwtTokenResponse> => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'unilink_jwtToken',
      });

      if (!credentials)
        throw new AppError('인증 권한이 없습니다.', 'KEYCHAIN_NO_TOKEN', 404);

      const returnData: KeychainType.GetJwtTokenResponse = {
        token: credentials.password,
      };
      return returnData;
    } catch (error: any) {
      console.error(`[getJwtToken] `, error.message);
      throw new Error('권한 설정 중 오류가 발생했습니다.');
    }
  };
