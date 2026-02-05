import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import GlobalStyle, { Color } from '../../../globalStyle';
import { LoaderKitView } from 'react-native-loader-kit';

// ==================== Animated ====================
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

const AniPressable = ({ label, onPress, disabled, loading, style }: Props) => {
  const isPressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        disabled || loading ? Color.main_disabled : Color.main,
        {
          duration: 300,
        },
      ),

      transform: [
        {
          scale: withTiming(isPressed.value ? 0.9 : 1, { duration: 300 }),
        },
      ],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(disabled ? Color.text_disabled : 'white', {
        duration: 300,
      }),
    };
  });

  return (
    <>
      <AnimatedPressable
        onPress={onPress}
        onPressIn={() => {
          isPressed.value = true;
        }}
        onPressOut={() => {
          isPressed.value = false;
        }}
        disabled={disabled}
        style={[styles.base, animatedStyle, style]}
      >
        {loading ? (
          <LoaderKitView
            style={{ width: 36, height: 36 }}
            name="BallPulse"
            animationSpeedMultiplier={0.8}
            color={'white'}
          />
        ) : (
          <Animated.Text style={[styles.text, animatedTextStyle]}>
            {label}
          </Animated.Text>
        )}
      </AnimatedPressable>
    </>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 16,
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AniPressable;
