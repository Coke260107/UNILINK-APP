// KakaoButton.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function KakaoButton() {
  return (
    <Pressable style={kakaoButtonStyle.button}>
      <View style={kakaoButtonStyle.iconArea}>
        <Svg width={24} height={24} viewBox="0 0 24 24">
          <Path
            d="M12 4C6.9 4 3 7.1 3 10.9c0 2.4 1.6 4.5 4 5.7l-1 3.6c-.1.4.3.7.7.5l4.2-2.8c.4 0 .7.1 1.1.1 5.1 0 9-3.1 9-7.1S17.1 4 12 4z"
            fill={'#000'}
          />
        </Svg>
      </View>

      <Text style={kakaoButtonStyle.text}>카카오로 시작하기</Text>
    </Pressable>
  );
}

const kakaoButtonStyle = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FEE500',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  iconArea: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  text: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  spacer: {
    width: 24,
  },
});
