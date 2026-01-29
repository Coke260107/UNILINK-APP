import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  AuthNavigator: NavigatorScreenParams<AuthStackParamList>;
};

export type AuthStackParamList = {
  Auth: undefined;
  Name: { accessToken: string };
  UserMetaData0: { accessToken: string; nickname: string };
};
