import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  MainTab: undefined;
  Auth: undefined;

  // Meeting
  CreateMeeting: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  ChattingList: undefined;
  MeetingList: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SetNickname: undefined;
  SetUserMetaData: undefined;
  SetLocation: undefined;
};
