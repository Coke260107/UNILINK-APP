import React, { useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Style
import GlobalStyle, { Color } from '../../../globalStyle';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Type
import type { AuthStackParamList } from '../../navigation/type';
type Props = NativeStackScreenProps<AuthStackParamList, 'Name'>;

// ==================== Main Component ==================== //
export default function SetNicknameScreen({ navigation, route }: Props) {
  const [nickname, setNickname] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const isValidNickname = nickname.trim().length > 0;
  const isDisabled = loading || !isValidNickname;

  // ==================== Handle ==================== //
  const handleBackPressable = () => {
    navigation.goBack();
  };

  const handleNextPressable = () => {
    if (isDisabled) return;

    setLoading(true);

    Keyboard.dismiss();

    const delay = 500;

    setTimeout(() => {
      const { accessToken } = route.params;

      navigation.navigate('UserMetaData0', {
        accessToken,
        nickname: nickname.trim(),
      });

      setLoading(false);
    }, delay);
  };

  return (
    <SafeAreaView style={GlobalStyle.safeAreaView}>
      {/* Header */}
      <View style={style.header}>
        <Pressable onPress={handleBackPressable}>
          <FontAwesome6 name="angle-left" iconStyle="solid" size={20} />
        </Pressable>
      </View>

      {/* Main Content */}
      <KeyboardAwareScrollView
        style={[style.scroll]}
        contentContainerStyle={[style.scroll_content]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[style.root_container]}>
          <View>
            <Text style={style.title}>이름을 가르쳐주세요</Text>
            <TextInput
              placeholder="이름"
              value={nickname}
              onChangeText={val => setNickname(val)}
              maxLength={20}
              autoFocus={true}
              style={style.nickName_textInput}
            />
          </View>

          <View>
            <Pressable
              onPress={handleNextPressable}
              disabled={isDisabled}
              style={[
                style.next_pressable,
                isDisabled && style.next_pressable_disabled,
              ]}
            >
              <Text
                style={[
                  style.next_text,
                  isDisabled && style.next_text_disabled,
                ]}
              >
                다음
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    justifyContent: 'center',
    paddingHorizontal: 12,
    height: 56,
    backgroundColor: Color.background,
  },

  scroll: {
    flex: 1,
  },

  scroll_content: {
    flexGrow: 1,

    paddingHorizontal: 24,
  },

  root_container: {
    flex: 1,

    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
  },

  nickName_textInput: {
    height: 52,
    borderBottomWidth: 1,
    borderColor: Color.border,
    fontSize: 18,
    marginTop: 40,
  },

  next_pressable: {
    height: 52, // 높이를 조금 키우면 터치가 편합니다
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.main,
    borderRadius: 16,
  },

  next_pressable_disabled: {
    backgroundColor: Color.main_disabled,
  },

  next_text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },

  next_text_disabled: {
    color: Color.text_disabled,
  },
});
