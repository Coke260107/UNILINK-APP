import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  AuthNavigator: NavigatorScreenParams<AuthStackParamList>;
   MainTab: NavigatorScreenParams<MainTabParamList>;
};

export type AuthStackParamList = {
  Auth: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  ChattingList: undefined;
};
