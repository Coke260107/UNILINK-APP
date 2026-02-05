import * as Keychain from 'react-native-keychain';

// Const
const KEYCHAIN_LIST = {
  KAKAO: {
    KEY: 'kakaoAccessToken',
    SERVICE: 'com.unilink.auth.kakaoAccessToken',
  },

  JWT: {
    KEY: 'jwtToken',
    SERVICE: 'com.unilink.auth.jwtToken',
  },
} as const;

// Type
import * as KeychainType from '../type/keychainType';

// ==================== Core ==================== //

/**
 * Keychain에 보안 토큰(또는 기밀 정보)을 key-value 형태로 저장합니다.
 *
 * @param key - 저장할 데이터의 식별자
 * @param token - 저장할 실제 토큰 값
 * @param service - 서비스 구분자
 *
 * @returns 저장이 성공한 경우 true, 실패하면 false를 반환
 * @throws 저장 도중 에러 발생 시 호출자에게 error를 던짐
 */
const setToken = async ({
  key,
  token,
  service,
}: KeychainType.SetTokenRequestType) => {
  try {
    await Keychain.resetGenericPassword({ service });

    const response = await Keychain.setGenericPassword(key, token, { service });

    if (!response) {
      console.warn(`[warn] setToken: set ${key} failed`);
      throw new Error(`keychain access failed for key: ${key}`);
    }

    if (__DEV__) console.log(`[setToken] Set ${key} successed`);
  } catch (error) {
    console.error(`[setToken] set ${key} error \n details: ${error}`);
    throw new Error(`오류가 발생하였습니다. 잠시 후 다시 시도해 주세요`);
  }
};

/**
 * Keychain에서 특정 서비스에 저장된 인증 정보를 조회합니다.
 *
 * @param service - 조회할 데이터의 서비스 구분자
 *
 * @returns 조회 성공 시 토큰, 데이터가 없으면 null 반환
 * @throws 조회 도중 에러 발생 시 호출자에게 error를 던짐
 */
const getToken = async (service: string): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: service });

    if (!credentials) {
      if (__DEV__)
        console.warn(`[getToken] Data not Found | Service: ${service}`);
      return null;
    }

    if (__DEV__) console.log(`[getToken] Success for ${service}`);

    return credentials.password;
  } catch (error: any) {
    if (__DEV__)
      console.error(
        `[getToken] Service: ${service} | Message: ${error.message}`,
      );
    throw new Error('알 수 없는 오류 발생했습니다. 잠시 후 다시 시도해 주세요');
  }
};

/**
 * Keychain에 저장된 특정 서비스의 데이터를 삭제합니다.
 *
 * @param service - 삭제할 데이터의 서비스 구분자
 * @returns 삭제 성공 시 true, 실패하면 false를 반환
 * @throws 삭제 도중 에러 발생 시 호출자에게 error를 던짐
 */
export const deleteToken = async (service: string) => {
  try {
    const response = await Keychain.resetGenericPassword({ service });

    if (!response) {
      console.warn(
        `[warn] deleteToken: Failed to delete credentials for ${service}`,
      );
      return;
    }

    if (__DEV__) console.log(`[deleteToken] Success for ${service}`);
    return true;
  } catch (error) {
    console.error(`[error] deleteToken: ${service} error ${error}`);
    throw new Error('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요');
  }
};

// ==================== General Function ==================== //
export const setJwtToken = async (jwtToken: string) => {
  await setToken({
    key: KEYCHAIN_LIST.JWT.KEY,
    token: jwtToken,
    service: KEYCHAIN_LIST.JWT.SERVICE,
  });
};

export const getJwtToken = async (): Promise<string | null> => {
  const token = await getToken(KEYCHAIN_LIST.JWT.SERVICE);
  return token;
};

export const deleteJwtToken = async () => {
  deleteToken(KEYCHAIN_LIST.JWT.SERVICE);
};
