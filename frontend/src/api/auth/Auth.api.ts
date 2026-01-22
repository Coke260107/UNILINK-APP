import { Linking } from 'react-native';
import { KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI } from '@env';

function parseCodeFromUrl(url: string) {
  const query = url.split('?')[1] ?? '';
  const params = new Map(
    query.split('&').map(part => {
      const [key, value] = part.split('=');
      return [key, decodeURIComponent(value ?? '')];
    }),
  );

  return {
    code: params.get('code') ?? null,
    state: params.get('state') ?? null,
    error: params.get('error') ?? null,
    errorDescription: params.get('error_description') ?? null,
  };
}

export async function getKakaoAuthCode(): Promise<string> {
  const state = String(Date.now());

  const authUrl =
    'https://kauth.kakao.com/oauth/authorize' +
    `?response_type=code` +
    `&client_id=${KAKAO_REST_API_KEY}` +
    `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
    `&state=${state}`;

  return new Promise((resolve, reject) => {
    const sub = Linking.addEventListener('url', event => {
      try {
        const {
          code,
          state: returnedState,
          error,
          errorDescription,
        } = parseCodeFromUrl(event.url);

        if (error) {
          reject(new Error(`${error}: ${errorDescription ?? ''}`));
          return;
        }

        if (!code) {
          reject(new Error('인가 코드가 없습니다.'));
          return;
        }

        if (returnedState !== state) {
          reject(new Error('state 불일치'));
          return;
        }

        resolve(code);
      } finally {
        sub.remove();
      }
    });

    Linking.openURL(authUrl);
  });
}
