import React, { RefObject, useCallback, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
type OpenModalPressableProps = {
  label: string;
  selectedValueLabel: string;
  onPress: () => void;
};

// Util
import PALETTE from '../../utils/color';
import DefaultHeader from '../../components/headers/DefaultHeader';
import AnimatedTextInput from '../../components/textInputs/AnimatedTextInput';

/* ==================== Inner Component ==================== */
const OpenModalPressable = (props: OpenModalPressableProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>{props.label}</Text>
      <Pressable
        style={{
          height: 52,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 4,
          borderBottomWidth: 1.5,
          borderColor: PALETTE.border,
        }}
      >
        <Text style={{ fontSize: 18 }}>{props.selectedValueLabel}</Text>
        <FontAwesome6 name="chevron-down" iconStyle="solid" size={16} />
      </Pressable>
    </View>
  );
};

// ==================== Main ==================== //
const SetProfileScreen = ({ route, navigation }: Props) => {
  const { nickname } = route.params;

  const genderBottomModalRef = useRef<BottomSheetModal>(null);
  const mbtiBottomModalRef = useRef<BottomSheetModal>(null);
  const ageBottomModalRef = useRef<BottomSheetModal>(null);

  const [gender, setGender] = useState<UserType.GenderType>('PRIVATE');
  const [mbti, setMbti] = useState<UserType.MbtiType>('PRIVATE');
  const [age, setAge] = useState<UserType.AgeType>('PRIVATE');
  const [introduction, setIntroducation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Handle
  const handleOpenModal = useCallback(
    (ref: RefObject<BottomSheetModal | null>) => {
      ref.current?.present();
    },
    [],
  );

  return (
    <>
      <SafeAreaView style={globalStyles.safeAreaView}>
        <DefaultHeader />

        {/* Main */}
        <KeyboardAwareScrollView
          style={[styles.scroll]}
          contentContainerStyle={[styles.scroll_content]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bottomOffset={999}
        >
          {/* Top */}
          <View style={[styles.root_container]}>
            <View>
              {/* Title */}
              <Text style={styles.title}>프로필 정보를 입력해 주세요</Text>

              {/* Profile */}
              <View style={styles.profile_container}>
                <View style={styles.profile_background}>
                  <FontAwesome6 name="user" iconStyle="solid" size={60} />
                </View>

                <Text style={styles.nickname}>{nickname}</Text>
              </View>

              {/* Gender & Mbti */}
              <View style={[styles.gender_mbti_container]}>
                <OpenModalPressable
                  label="성별"
                  onPress={() => null}
                  selectedValueLabel={UserType.GENDER_LABEL[gender]}
                />
                <OpenModalPressable
                  label="MBTI"
                  onPress={() => null}
                  selectedValueLabel={UserType.MBTI_LABEL[mbti]}
                />
              </View>

              {/* Age */}
              <View style={[styles.age_container]}>
                <OpenModalPressable
                  label="연령대"
                  onPress={() => null}
                  selectedValueLabel={UserType.AGE_LABEL[age]}
                />
              </View>

              {/* Introduce */}
              <View style={[styles.introduction_container]}>
                <Text style={styles.label}>소개글</Text>
                <AnimatedTextInput
                  value={introduction}
                  onChangeText={val => setIntroducation(val)}
                  placeholder="간단한 소개글을 적어보세요 (최대 100자)"
                  multiline={true}
                  style={[styles.introduction_textInput]}
                />
              </View>
            </View>

            {/* Bottom */}
            <AnimatedPressable label="다음" onPress={() => null} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

      {/* ========== Bottom Sheet ========== */}

      {/* Gender */}
      <SelectBottomSheetModal<UserType.GenderType>
        ref={genderBottomModalRef}
        title="성별을 선택해 주세요"
        options={UserType.GENDER_OPTION}
        selected={gender}
        onSelected={() => null}
      />

      {/* MBTI */}
      <SelectBottomSheetModal<UserType.MbtiType>
        ref={mbtiBottomModalRef}
        title="MBTI를 선택해 주세요"
        options={UserType.MBTI_OPTION}
        selected={mbti}
        onSelected={() => null}
        colNum={2}
      />

      {/* Age */}
      <SelectBottomSheetModal<UserType.AgeType>
        ref={ageBottomModalRef}
        title="나이대를 선택해 주세요"
        options={UserType.AGE_OPTION}
        selected={age}
        onSelected={() => null}
      />
    </>
  );
};

// ==================== Style ==================== //
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  scroll_content: {
    flexGrow: 1,
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

  profile_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  gender_mbti_container: {
    flexDirection: 'row',

    marginBottom: 24,

    gap: 16,
  },

  age_container: {
    marginBottom: 24,
  },

  // Profile
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

  // Introduce
  introduction_container: {
    marginBottom: 48,
  },

  label: {
    marginBottom: 4,

    fontSize: 14,
    color: PALETTE.text,
  },

  introduction_textInput: {
    height: 100,

    borderRadius: 12,
  },
});

/* ==================== Export ==================== */
export default SetProfileScreen;
