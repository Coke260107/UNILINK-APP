import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import PALETTE from '../../utils/color';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

/* ==================== Main ==================== */
const AniPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedPressable = ({
  label,
  onPress,
  disabled,
  loading,
  style,
}: Props) => {
  const isPressed = useSharedValue(false);
  const isDisabled = disabled || loading;
  const timingConfig = { duration: 300 };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      isDisabled ? PALETTE.disable : PALETTE.main,
      timingConfig,
    ),
    transform: [
      { scale: withTiming(isPressed.value ? 0.975 : 1, timingConfig) },
    ],
  }));

  return (
    <AniPressable
      onPress={onPress}
      onPressIn={() => (isPressed.value = true)}
      onPressOut={() => (isPressed.value = false)}
      disabled={isDisabled}
      style={[styles.container, animatedContainerStyle, style]}
    >
      <Animated.Text style={[styles.text]}>{label}</Animated.Text>
    </AniPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default AnimatedPressable;
