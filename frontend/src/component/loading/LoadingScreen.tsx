// src/component/loading/loadingScreen.tsx

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LoaderKitView from 'react-native-loader-kit';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Color } from '../../../globalStyle';

// Type
type Props = {
  message?: string;
};

// ==================== Main ==================== //
const LoadingScreen = ({ message = '데이터를 불러오는 중...' }: Props) => {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={styles.root_conatiner}
    >
      <LoaderKitView
        name="BallClipRotateMultiple"
        style={styles.loader}
        color={Color.main}
      />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

// ==================== Style ==================== //
const styles = StyleSheet.create({
  root_conatiner: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  loader: {
    width: 60,
    height: 60,
  },

  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

// ==================== Export ==================== //
export default LoadingScreen;
