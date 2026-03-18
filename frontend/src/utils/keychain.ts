// src/utils/keychain.ts
import * as Keychain from 'react-native-keychain';

// Type & Const
import * as KeychainType from '../types/util/keychainType';
export const KEYCHAIN_SERVICE_NAME = ['JWT'];

export const saveJwtToken = async (
  requestData: KeychainType.SaveJwtTokenRequestType,
) => {
  const userId = requestData.userId;
  const jwtToken = requestData.token;

  try {
    await Keychain.setGenericPassword(userId.toString(), jwtToken, {
      service: 'unilink_jwtToken',
      securityLevel: Keychain.SECURITY_LEVEL.ANY,
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

      return credentials ? credentials.password : null;
    } catch (error: any) {
      console.error(`[getJwtToken] `, error.message);
      throw new Error('권한 설정 중 오류가 발생했습니다.');
    }
  };
