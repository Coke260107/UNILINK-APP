// src/screens/auth/SetNicknameScreen.tsx

import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

// Api
import { CheckNicknameDuplication } from '../../api/auth/authApi';

// Component
import DefaultHeader from '../../components/headers/DefaultHeader';

// Type
import { RegistrationStackParamList } from '../../types/navigationType';

// Style
import globalStyles from '../../utils/globalStyle';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AnimatedPressable from '../../components/buttons/AnimatedPressable';
import AnimatedTextInput from '../../components/textInputs/AnimatedTextInput';

type Props = NativeStackScreenProps<RegistrationStackParamList, 'SetNickname'>;

/* ==================== Main ==================== */
const SetNicknameScreen = ({ navigation }: Props) => {
  const [nickname, setNickname] = useState<string>('');
  const [nicknameValidation, setNicknameValidation] = useState<boolean | null>(
    null,
  );

  const handleConfirm = () => {
    if (!nickname.trim()) return;
    navigation.navigate('SetProfile', { nickname: nickname.trim() });
  };

  const handleCheckNickname = async () => {
    const nicknameValidation = await CheckNicknameDuplication(nickname);
    setNicknameValidation(nicknameValidation);
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <DefaultHeader />
      <KeyboardAvoidingView
        behavior="padding"
        style={[styles.container]}
        keyboardVerticalOffset={16}
      >
        <View>
          <Text style={[styles.title]}>사용할 이름을 입력해주세요</Text>
          <AnimatedTextInput
            value={nickname}
            onChangeText={val => setNickname(val)}
            onBlur={handleCheckNickname}
            placeholder="이름"
            style={styles.textInput}
          />
          {nicknameValidation === false && (
            <Text style={[styles.error_text]}>사용할 수 없는 이름입니다.</Text>
          )}
        </View>
        <View>
          <AnimatedPressable
            onPress={handleConfirm}
            label="확인"
            disabled={!nicknameValidation}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
/* ==================== Style ==================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
  },

  textInput: {
    height: 48,

    marginTop: 40,

    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'red',

    fontSize: 18,
  },

  error_text: {
    marginTop: 6,

    color: 'red',
  },
});

/* ==================== Export ==================== */
export default SetNicknameScreen;
