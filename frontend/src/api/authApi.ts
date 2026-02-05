import * as Keychain from 'react-native-keychain';
import client from '../utility/client';

// Type
import * as AuthType from '../type/authType';
import * as UserType from '../type/userType';

// /**
//  * 기존 유저와 신규 유저를 구분하는 API (Mock)
//  *
//  * @param kakaoAccessToken Kakao Access Token
//  * @returns { userRole, accessToken } userRole과 accessToken(jwt)토큰을 반환
//  */
// export const Auth = async ({
//   jwtToken,
// }: AuthType.AuthRequestType): Promise<AuthType.AuthResponseType> => {
//   /* 실제 사용 코드 (주석 처리)*/
//   const response = await client.post('/auth', {
//     jwtToken
//   });
//   return response.data;

//   /* 테스트 코드 (2초 Delay) */
//   await new Promise<void>(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, 2000);
//   });

//   // Dummy data
//   const mockResponse: AuthType.AuthResponseType = {
//     jwtToken: 'mock-jwt-token-12345',
//     userRole: 'User',
//   };

//   console.log(`[Mock API] Auth 인증 완료: ${mockResponse.userRole}`);

//   return mockResponse;
// };

/**
 * userRole이 'User'일 때 로그인 함수
 *
 * @param jwtToken
 * @returns
 */
export const Login = async (jwtToken: string): Promise<UserType.User> => {
  try {
    /* 실제 로직 */
    // const response = await client.post('/auth/login', { jwtToken: jwtToken });
    // const data: UserType.User = response.data;
    // return data;

    // /* Test */
    // Delay 2초
    await new Promise<void>(resolve =>
      setTimeout(() => {
        resolve();
      }, 2000),
    );

    const dummyData: UserType.User = {
      id: 1,
      userRole: 'User',
      nickname: '조인흠',
      gender: 'MALE',
      mbti: 'ENTP',
      age: 'AGE_20',
      introduction: '안녕하세요!',
    };

    return dummyData;
  } catch (error: any) {
    console.error(`[Login] ${error.message}`);
    throw new Error('Login에서 오류 발생');
  }
};

export const Auth = async (
  token: string,
): Promise<AuthType.AuthResponseType> => {
  /* Main logic */
  // const response = await client.get('/auth/auth', {
  //   params: {
  //     jwtToken: token,
  //   },
  // });

  // const data = response.data as AuthType.AuthResponseType;
  // return data;

  /* Test logic */
  // Delay 2 sec
  await new Promise<void>(resolve =>
    setTimeout(() => {
      resolve();
    }, 2000),
  );

  const data: AuthType.AuthResponseType = {
    userRole: 'Guest',
  };

  return data;
};

export const Register = async (
  kakaoAccessToken: string,
): Promise<AuthType.RegisterResponseType> => {
  /* Main logic */
  // const response = await client.get('/auth/register')
  // const data = response.data as AuthType.RegisterResponseType;
  // return data;

  /* Test logic */
  await new Promise<void>(resolve =>
    setTimeout(() => {
      resolve();
    }, 2000),
  );

  const data: AuthType.RegisterResponseType = {
    userRole: 'Guest',
    jwtToken: '1234',
  };

  return data;
};
