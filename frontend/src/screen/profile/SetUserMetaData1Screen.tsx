import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useHeaderHeight } from '@react-navigation/elements';

// Style
import GlobalStyle, { Color } from '../../../globalStyle';

// Type
import type { AuthStackParamList } from '../../navigation/type';
type Props = NativeStackScreenProps<AuthStackParamList, 'Name'>;

// ============================================================

// Main
export default function SetNicknameScreen({ navigation }: Props) {
  const { bottom } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  return (
    <>
      <View style={[GlobalStyle.base_container, { paddingBottom: bottom }]}>
        <ScrollView
          contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
        >
          <View>
            <Text style={style.title}>이름을 가르쳐주세요!</Text>
            <TextInput style={style.nickName_textInput} placeholder="이름" />
          </View>

          <View>
            <Pressable style={[style.next_pressable]}>
              <Text style={style.next_text}>다음</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

// ============================================================

// Style
const style = StyleSheet.create({
  root_container: {
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
  },

  nickName_textInput: {
    height: 52,

    borderBottomWidth: 1,

    fontSize: 18,
  },

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
