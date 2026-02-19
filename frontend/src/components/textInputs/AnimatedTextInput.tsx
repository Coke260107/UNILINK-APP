// src/components/inputs/AnimatedTextInput.tsx

import React from 'react';
import { TextInput, StyleSheet, TextStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import PALETTE from '../../utils/color';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: TextStyle;
};

/* ==================== Main ==================== */
const AniTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedTextInput = ({
  value,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry,
  style,
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
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={PALETTE.border}
      secureTextEntry={secureTextEntry}
      onFocus={() => (isFocused.value = true)}
      onBlur={() => {
        isFocused.value = false;
        onBlur?.();
      }}
      style={[styles.container, animatedStyle, style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderWidth: 1,
    fontSize: 18,
    color: 'black',
  },
});

export default AnimatedTextInput;
