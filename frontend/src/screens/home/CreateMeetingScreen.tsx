// src/screens/home/CreateMeetingScreen.tsx

import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Icon
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Style
import globalStyles from '../../utils/globalStyle';
import PALETTE from '../../utils/color';

// Type
import { RootStackParamList } from '../../types/util/navigationType';
import {
  CATEGORY,
  CATEGORY_LABEL,
  CategoryType,
} from '../../types/meeting/meetingType';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

/* ==================== Main ==================== */
const CreateMeetingScreen = () => {
  // useState
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('study');

  const navigation = useNavigation<NavigationProps>();

  // Handle
  const handlePressBack = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('MainTab');
  }, []);

  return (
    <SafeAreaView style={[globalStyles.safeAreaView]}>
      {/* Header */}
      <View style={[sytles.header_container]}>
        <Pressable onPress={() => handlePressBack()}>
          <FontAwesome6
            name="angle-left"
            iconStyle="solid"
            size={20}
            color={'rgba(0, 0, 0, 1)'}
          />
        </Pressable>

        <Text style={[sytles.screen_title]}>모임 생성하기</Text>
      </View>

      {/* Main */}
      <View style={[sytles.main_conatiner]}>
        {/* Select Photo */}
        <Pressable style={[sytles.photon_container]}>
          <FontAwesome6
            name="camera-retro"
            iconStyle="solid"
            size={28}
            color={'rgb(113, 113, 123)'}
          />
          {/*Zinc-500 */}
          <Text>
            대표 이미지 등록 {'('}0/1{')'}
          </Text>
        </Pressable>

        {/* Meeting Title */}
        <View style={[sytles.meetingTitle_container]}>
          <Text style={[sytles.label]}>모임 이름</Text>
          <TextInput
            placeholder="어떤 모임인지 잘 알 수 있는 이름을 지어주세요"
            style={[sytles.meetingTitle_TextInput]}
          />
        </View>

        {/* Select Category */}
        <View style={[sytles.category_container]}>
          <Text style={[sytles.label, { marginBottom: 12 }]}>카테고리</Text>

          <View style={[sytles.category_pressable_container]}>
            {CATEGORY.map(item => (
              <Pressable
                key={item}
                onPress={() => setSelectedCategory(item)}
                style={[
                  sytles.category_pressable,
                  selectedCategory === item && [
                    sytles.category_pressable_selected,
                  ],
                ]}
              >
                <Text
                  style={[
                    selectedCategory === item && [
                      sytles.categroy_pressable_text,
                    ],
                  ]}
                >
                  {CATEGORY_LABEL[item]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

/* ==================== Handle ==================== */

/* ==================== Style ==================== */
const sytles = StyleSheet.create({
  header_container: {
    height: 58,

    flexDirection: 'row',

    alignItems: 'center',
  },

  screen_title: {
    flex: 1,

    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },

  label: {
    fontWeight: '600',
  },

  main_conatiner: {
    gap: 32,
  },

  photon_container: {
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 64,

    gap: 4,

    backgroundColor: 'rgba(228, 228, 231, 0.75)', // Zinc-200/25

    borderWidth: 1,
    borderRadius: 24,
    borderStyle: 'dashed',
  },

  meetingTitle_container: {},

  meetingTitle_TextInput: {
    width: '100%',

    padding: 0,
    paddingVertical: 8,
    margin: 0,

    borderBottomWidth: 1,

    fontSize: 16,
  },

  category_container: {},

  category_pressable_container: {
    flexDirection: 'row',

    gap: 6,
  },

  category_pressable: {
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 16,
    paddingVertical: 4,

    borderWidth: 1,
    borderRadius: 16,
  },

  category_pressable_selected: {
    backgroundColor: PALETTE.main,
  },

  categroy_pressable_text: {
    fontWeight: '600',
    color: 'white',
  },
});

/* ==================== Export ==================== */
export default CreateMeetingScreen;
