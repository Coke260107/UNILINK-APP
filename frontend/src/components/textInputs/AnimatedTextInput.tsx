// src/components/inputs/AnimatedTextInput.tsx

import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import PALETTE from '../../utils/color';

interface Props extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

/* ==================== Main ==================== */
const AniTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedTextInput = ({
  style,
  onFocus,
  onBlur,
  multiline,
  ...rest
}: Props) => {
  const isFocused = useSharedValue(false);
  const timingConfig = { duration: 150 };

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      isFocused.value ? PALETTE.main : PALETTE.border,
      timingConfig,
    ),
  }));

  return (
    <AniTextInput
      {...rest}
      multiline={multiline}
      placeholderTextColor={PALETTE.border}
      onFocus={e => {
        isFocused.value = true;
        onFocus?.(e);
      }}
      onBlur={e => {
        isFocused.value = false;
        onBlur?.(e);
      }}
      style={[
        styles.container,
        multiline && styles.multiline,
        animatedStyle,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 48, // 고정 height 대신 minHeight를 써야 글이 길어질 때 늘어날 수 있습니다
    borderWidth: 1,
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 16,
    paddingVertical: 12, // 상하 패딩을 줘서 텍스트가 테두리에 붙지 않게 합니다
  },
  multiline: {
    minHeight: 120, // 긴 글 작성 시 기본 높이를 좀 더 크게 잡아줍니다
    textAlignVertical: 'top', // 🚨 Android 필수: 긴 글 작성 시 텍스트가 위에서부터 시작하도록 합니다
  },
});

export default AnimatedTextInput;
