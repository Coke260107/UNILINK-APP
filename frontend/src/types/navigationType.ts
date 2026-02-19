export type RootStackParamList = {
  Login: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SetNickname: undefined;
  SetProfile: { nickname: string };
};

export type RegistrationStackParamList = {
  SetNickname: undefined;
  SetProfile: { nickname: string };
};
