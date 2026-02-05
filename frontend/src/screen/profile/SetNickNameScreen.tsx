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
import AniPressable from '../../component/button/AnimatedButton';
import { CheckNickname } from '../../api/profileApi';
type Props = NativeStackScreenProps<AuthStackParamList, 'Name'>;

// ==================== Main Component ==================== //
export default function SetNicknameScreen({ navigation, route }: Props) {
  const [nickname, setNickname] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const isNicknameTextInputDisabled = nickname.trim().length === 0 || loading;

  // ==================== Handle ==================== //

  /**
   * 기능: 뒤로가기 핸들
   */
  const handleBackPressable = () => {
    Keyboard.dismiss();

    if (!navigation.canGoBack()) {
      navigation.navigate('Auth');
      return;
    }
    navigation.goBack();
  };

  /**
   * 기능: 다음 버튼 핸들
   */
  const handleNextPressable = async () => {
    if (isNicknameTextInputDisabled) return;

    setLoading(true);
    Keyboard.dismiss();

    try {
      const isDuplication = await CheckNickname(nickname);

      if (isDuplication) {
        console.warn(`[handleNextPressable] ${nickname} is Duplication`);
        return;
      }

      navigation.navigate('UserMetaData0', { nickname: nickname });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.safeAreaView}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBackPressable}>
          <FontAwesome6 name="angle-left" iconStyle="solid" size={20} />
        </Pressable>
      </View>

      {/* Main Content */}
      <KeyboardAwareScrollView
        style={[styles.scroll]}
        contentContainerStyle={[styles.scroll_content]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.root_container]}>
          <View>
            <Text style={styles.title}>이름을 가르쳐주세요</Text>
            <TextInput
              editable={!loading}
              placeholder="이름"
              value={nickname}
              onChangeText={val => setNickname(val)}
              maxLength={20}
              autoFocus={true}
              style={styles.nickName_textInput}
            />
          </View>

          <View>
            <AniPressable
              label="다음"
              onPress={() => handleNextPressable()}
              disabled={isNicknameTextInputDisabled}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

// ==================== Style ====================
const styles = StyleSheet.create({
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

  next_text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },

  next_text_disabled: {
    color: Color.text_disabled,
  },
});
