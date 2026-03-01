export type SaveJwtTokenRequestType = {
  userId: number;
  token: string;
};

export type GetJwtTokenResponse = {
  token: string;
};
