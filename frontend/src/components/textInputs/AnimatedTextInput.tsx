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

// 1. TextInputProps를 상속받아 모든 기본 속성(multiline, maxLength 등)을 허용합니다.
// 2. style은 배열 형태의 스타일도 받을 수 있도록 StyleProp<TextStyle>로 넓혀줍니다.
interface Props extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

/* ==================== Main ==================== */
const AniTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedTextInput = ({
  style,
  onFocus,
  onBlur,
  multiline, // 긴 글 작성 여부를 확인하기 위해 빼냅니다
  ...rest // 나머지 모든 TextInput 속성들을 ...rest로 한 번에 받습니다
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
      {...rest} // value, onChangeText, placeholder 등 부모가 넘긴 모든 속성을 그대로 주입합니다
      multiline={multiline}
      placeholderTextColor={PALETTE.border}
      onFocus={e => {
        isFocused.value = true;
        onFocus?.(e); // 부모에서 onFocus를 따로 넘겼다면 실행해 줍니다
      }}
      onBlur={e => {
        isFocused.value = false;
        onBlur?.(e); // 부모에서 onBlur를 따로 넘겼다면 실행해 줍니다
      }}
      style={[
        styles.container,
        multiline && styles.multiline, // multiline이 true일 때만 적용되는 스타일
        animatedStyle,
        style, // 부모에서 넘긴 커스텀 스타일이 가장 마지막에 덮어씌워집니다
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
