import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  AuthNavigator: NavigatorScreenParams<AuthStackParamList>;
  MainTab: NavigatorScreenParams<MainTabParamList>;
  SearchNavigator: NavigatorScreenParams<SearchStackParamList>;
};

export type AuthStackParamList = {
  Auth: undefined;
};

export type SearchStackParamList = {
  Search: { query?: string } | undefined;
};

export type MainTabParamList = {
  Home: undefined;
  ChattingList: undefined;
};
