import React, { useCallback, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Component
import GenderBottomModal from '../../component/bottomSheet/BottomModal';
import MbtiBottomModal from '../../component/bottomSheet/ScrollableBottomModal';

// Style
import GlobalStyle, { Color } from '../../../globalStyle';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Type
import type { AuthStackParamList } from '../../navigation/type';
import {
  GenderType,
  GENDER_LABEL,
  GENDER_OPTION,
  MbtiType,
  MBTI_LABEL,
  MBTI_OPTION,
  AgeType,
  AGE_LABEL,
  AGE_OPTION,
} from '../../type/ProfileType';

type Props = NativeStackScreenProps<AuthStackParamList, 'UserMetaData0'>;

// ============================================================

// Main Component
export default function SetUserMetaData0Screen({ route, navigation }: Props) {
  const { accessToken, nickname } = route.params;
  const insets = useSafeAreaInsets();

  const genderBottomModalRef = useRef<BottomSheetModal>(null);
  const mbtiBottomModalRef = useRef<BottomSheetModal>(null);
  const ageBottomModalRef = useRef<BottomSheetModal>(null);

  const [gender, setGender] = useState<GenderType>('PRIVATE');
  const [mbti, setMbti] = useState<MbtiType>('PRIVATE');
  const [age, setAge] = useState<AgeType>('PRIVATE');

  // Handle
  const handlePresentBottomModal = (
    ref: React.RefObject<BottomSheetModal | null>,
  ) => {
    Keyboard.dismiss();

    ref.current?.present();
  };

  const handleDismissBottomModal = <T extends string>(
    ref: React.RefObject<BottomSheetModal | null>,
    selected: T,
    setter: (value: T) => void,
  ) => {
    setter(selected);

    ref.current?.dismiss();
  };

  const handleBackPressable = () => {
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={GlobalStyle.safeAreaView}>
        {/* Header */}
        <View style={[style.header]}>
          <Pressable onPress={handleBackPressable}>
            <FontAwesome6 name="angle-left" iconStyle="solid" size={20} />
          </Pressable>
        </View>

        {/* Main */}
        <KeyboardAwareScrollView
          style={[style.scroll]}
          contentContainerStyle={[style.scroll_content]}
          keyboardShouldPersistTaps="handled"
          bottomOffset={999}
        >
          <View style={[style.root_container]}>
            <View>
              <Text style={style.title}>프로필 정보를 입력해 주세요</Text>

              {/* 프로필 이미지 */}
              <View style={style.profile_container}>
                <View style={style.profile_background}>
                  <FontAwesome6 name="user" iconStyle="solid" size={60} />
                </View>

                <Text style={style.nickname}>{nickname}</Text>
              </View>

              {/* 성별 및 MBTI */}
              <View style={{ flexDirection: 'row', gap: 24, marginBottom: 24 }}>
                {/* 성별 */}
                <View style={{ flex: 1 }}>
                  <Text style={style.label}>성별</Text>
                  <Pressable
                    style={[style.select_pressable]}
                    onPress={() =>
                      handlePresentBottomModal(genderBottomModalRef)
                    }
                  >
                    <Text style={style.selected_text}>
                      {GENDER_LABEL[gender].label}
                    </Text>
                    <FontAwesome6
                      name="angle-down"
                      iconStyle="solid"
                      size={18}
                      color={Color.border}
                    />
                  </Pressable>
                </View>

                {/* MBTI */}
                <View style={{ flex: 1 }}>
                  <Text style={style.label}>MBTI</Text>
                  <Pressable
                    style={style.select_pressable}
                    onPress={() => handlePresentBottomModal(mbtiBottomModalRef)}
                  >
                    <Text style={style.selected_text}>
                      {MBTI_LABEL[mbti].label}
                    </Text>

                    <FontAwesome6
                      name="angle-down"
                      iconStyle="solid"
                      size={18}
                      color={Color.border}
                    />
                  </Pressable>
                </View>
              </View>

              {/* Age */}
              <View style={{ marginBottom: 24 }}>
                <Text style={style.label}>나이</Text>
                <Pressable
                  style={style.select_pressable}
                  onPress={() => handlePresentBottomModal(ageBottomModalRef)}
                >
                  <Text style={style.selected_text}>
                    {AGE_LABEL[age].label}
                  </Text>

                  <FontAwesome6
                    name="angle-down"
                    iconStyle="solid"
                    size={18}
                    color={Color.border}
                  />
                </Pressable>
              </View>

              {/* Introduce */}
              <View>
                <Text style={[style.label, { marginBottom: 12 }]}>소개글</Text>
                <TextInput
                  placeholder="간단한 소개글을 작성해 주세요. (최대 100자)"
                  style={{
                    padding: 12,
                    height: 100,
                    borderColor: Color.border,
                    borderWidth: 1,
                    borderRadius: 12,

                    fontSize: 16,
                  }}
                  multiline={true}
                  textAlignVertical="top"
                  maxLength={100}
                />
              </View>
            </View>
            <View>
              <Pressable style={[style.next_pressable]}>
                <Text style={[style.next_text]}>다음</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

      {/* ========== Bottom Sheet ========== */}
      {/* Gender */}
      <GenderBottomModal<GenderType>
        ref={genderBottomModalRef}
        title="성별을 선택해 주세요"
        option={GENDER_OPTION}
        selected={gender}
        onSelected={value =>
          handleDismissBottomModal(genderBottomModalRef, value, setGender)
        }
      />

      {/* MBTI */}
      <MbtiBottomModal
        ref={mbtiBottomModalRef}
        title="MBTI를 선택해 주세요"
        option={MBTI_OPTION}
        selected={mbti}
        onSelected={value =>
          handleDismissBottomModal(mbtiBottomModalRef, value, setMbti)
        }
      />

      {/* Age */}
      <GenderBottomModal<AgeType>
        ref={ageBottomModalRef}
        title="나이대를 선택해 주세요"
        option={AGE_OPTION}
        selected={age}
        onSelected={value =>
          handleDismissBottomModal(ageBottomModalRef, value, setAge)
        }
      />
    </>
  );
}

// Style
const style = StyleSheet.create({
  // ==================== Header ====================
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
    flexGrow: 1,

    gap: 24,

    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',

    marginBottom: 40,
  },

  // ==================== Profile ====================
  profile_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  profile_background: {
    aspectRatio: 1,

    justifyContent: 'center',
    alignItems: 'center',

    padding: 24,
    marginBottom: 20,

    borderWidth: 1,
    borderRadius: 999,
  },

  nickname: {
    marginBottom: 40,

    fontSize: 20,
    fontWeight: '600',
  },

  // ==================== Select ====================
  label: {
    fontSize: 14,
    color: Color.text,
  },

  select_pressable: {
    height: 52,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderColor: Color.border,
  },

  selected_text: {
    fontSize: 18,
  },

  // ==================== Footer ====================
  next_pressable: {
    height: 44,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Color.main,

    borderRadius: 16,
  },

  next_text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
