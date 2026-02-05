// src/type/keychainType.ts

export type SetTokenRequestType = {
  key: string;
  token: string;
  service: string;
};

export type GetTokenResponseType = {
  token: string;
};
