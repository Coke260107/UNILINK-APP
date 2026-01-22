import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

// Animation
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

// Style
import globalStyle from '../../../globalStyle';
import styles from './Styles';

// Utility
import Colors from '../../utility/color';

export default function SignupNameScreen() {
  const insets = useSafeAreaInsets();
  const nameTextInputFocus = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      nameTextInputFocus.value,
      [0, 1],
      ['rgb(229, 229, 229)', Colors.main],
    );

    return {
      borderBottomColor: borderColor,
    };
  });
  return (
    <>
      <View
        style={[
          globalStyle.base_container,
          { paddingBottom: insets.bottom + 12 },
        ]}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: 'space-between' }}
        >
          <View>
            <Text style={styles.title}>이름이 무엇인가요?</Text>
            <AnimatedInput
              placeholder="이름"
              style={[styles.textInput, animatedStyle]}
              onFocus={() =>
                (nameTextInputFocus.value = withTiming(1, { duration: 200 }))
              }
              onBlur={() =>
                (nameTextInputFocus.value = withTiming(0, { duration: 200 }))
              }
            />
          </View>

          <View>
            <Pressable style={styles.nextButton}>
              <Text style={styles.nextButtonText}>다음</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
