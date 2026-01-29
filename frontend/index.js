/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import 'react-native-gesture-handler';

initializeKakaoSDK('f8bea2024f9b5ba980561d8a549505e0');
AppRegistry.registerComponent(appName, () => App);
