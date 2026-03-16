// src/api/user/userApi.ts
import Api from '../../utils/axios';

// Type
import {
  ReverseGeocodeRequestType,
  ReverseGeocodeResponseType,
} from '../../types/user/userApiType';

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

export const ReverseGeocode = async ({
  latitude,
  longitude,
}: ReverseGeocodeRequestType): Promise<ReverseGeocodeResponseType> => {
  try {
    if (!latitude || !longitude) {
      if (__DEV__)
        console.error('[ReverseGeocode] latitude or longitude is null');
      throw new Error('오류가 발생했습니다. 잠시 후 다시 시도해 주세요');
    }

    const res = await Api.get('location/reverse-geocode', {
      params: { latitude, longitude },
    });

    if (!res.data) {
      if (__DEV__)
        console.error(`[ReverseGeocode] backend data is undefined or null`);
      throw new Error('오류가 발생했습니다. 잠시 후 다시 시도해 주세요');
    }

    const returnValue: ReverseGeocodeResponseType = {
      address: res.data.address,
    };
    return returnValue;
  } catch (error: any) {
    if (__DEV__) console.error(`[ReverseGeocode] `, error.message);
    throw new Error('오류가 발생했습니다. 잠시 후 다시 시도해 주세요');
  }
};
