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

// Api

// Component
import SelectBottomSheetModal from '../../components/modals/SelectBottomSheetModal';

// Style
import globalStyles from '../../utils/globalStyle';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Type
import * as UserType from '../../types/userType';
import { AuthStackParamList } from '../../types/navigationType';
import AnimatedPressable from '../../components/buttons/AnimatedPressable';

type Props = NativeStackScreenProps<AuthStackParamList, 'SetProfile'>;

// Util
import PALETTE from '../../utils/color';

// ============================================================

// Main Component
const SetProfileScreen = ({ route, navigation }: Props) => {
  const { nickname } = route.params;

  const genderBottomModalRef = useRef<BottomSheetModal>(null);
  const mbtiBottomModalRef = useRef<BottomSheetModal>(null);
  const ageBottomModalRef = useRef<BottomSheetModal>(null);

  const [gender, setGender] = useState<UserType.GenderType>('PRIVATE');
  const [mbti, setMbti] = useState<UserType.MbtiType>('PRIVATE');
  const [age, setAge] = useState<UserType.AgeType>('PRIVATE');
  const [loading, setLoading] = useState<boolean>(false);

  // #region Handle
  /**
   * BottomModal active handle
   *
   * @param ref
   */
  const handlePresentBottomModal = (
    ref: React.RefObject<BottomSheetModal | null>,
  ) => {
    Keyboard.dismiss();

    ref.current?.present();
  };

  /**
   * BottomModal dismiss handle
   *
   * @param ref
   * @param selected
   * @param setter
   */
  const handleDismissBottomModal = <T extends string>(
    ref: React.RefObject<BottomSheetModal | null>,
    selected: T,
    setter: (value: T) => void,
  ) => {
    setter(selected);

    ref.current?.dismiss();
  };

  /**
   * Go back Screen Handle
   */
  const handleBackPressable = () => {
    navigation.goBack();
  };

  const handleCreateProfile = async () => {
    try {
      if (loading) return;
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  // #endregion Handle

  return (
    <>
      <SafeAreaView style={globalStyles.safeAreaView}>
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
                      {UserType.GENDER_LABEL[gender]}
                    </Text>
                    <FontAwesome6
                      name="angle-down"
                      iconStyle="solid"
                      size={18}
                      color={PALETTE.border}
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
                      {UserType.MBTI_LABEL[mbti]}
                    </Text>

                    <FontAwesome6
                      name="angle-down"
                      iconStyle="solid"
                      size={18}
                      color={PALETTE.border}
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
                    {UserType.AGE_LABEL[age]}
                  </Text>

                  <FontAwesome6
                    name="angle-down"
                    iconStyle="solid"
                    size={18}
                    color={PALETTE.border}
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
                    borderColor: PALETTE.border,
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
              <AnimatedPressable
                label="다음"
                onPress={() => null}
                loading={loading}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

      {/* ========== Bottom Sheet ========== */}
      {/* Gender */}
      {/* <SelectBottomModal<UserType.GenderType>
        ref={genderBottomModalRef}
        title="성별을 선택해 주세요"
        option={UserType.GENDER_OPTION}
        selected={gender}
        onSelected={value =>
          handleDismissBottomModal(genderBottomModalRef, value, setGender)
        }
      /> */}

      <SelectBottomSheetModal<UserType.GenderType>
        ref={genderBottomModalRef}
        title="성별을 선택해 주세요"
        option={UserType.GENDER_OPTION}
        selected={gender}
        onSelected={() => null}
      />

      {/* MBTI */}
      <SelectBottomSheetModal<UserType.MbtiType>
        ref={mbtiBottomModalRef}
        title="MBTI를 선택해 주세요"
        option={UserType.MBTI_OPTION}
        selected={mbti}
        onSelected={() => null}
        colNum={2}
      />

      {/* Age */}
      {/* <SelectBottomModal<UserType.AgeType>
        ref={ageBottomModalRef}
        title="나이대를 선택해 주세요"
        option={UserType.AGE_OPTION}
        selected={age}
        onSelected={value =>
          handleDismissBottomModal(ageBottomModalRef, value, setAge)
        }
      /> */}
    </>
  );
};

// Style
const style = StyleSheet.create({
  // ==================== Header ====================
  header: {
    justifyContent: 'center',
    paddingHorizontal: 12,

    height: 56,

    backgroundColor: PALETTE.background,
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
    color: PALETTE.text,
  },

  select_pressable: {
    height: 52,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderColor: PALETTE.border,
  },

  selected_text: {
    fontSize: 18,
  },

  // ==================== Footer ====================
  next_pressable: {
    height: 44,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: PALETTE.main,

    borderRadius: 16,
  },

  next_text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default SetProfileScreen;
