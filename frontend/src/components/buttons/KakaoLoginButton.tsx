// src/components/buttons/KakaoLoginButton.tsx

import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

// Type
type Props = {
  onPress: () => void;
}

// ==================== Main ==================== //
const KakaoLoginButton = ({ onPress }: Props) => {
  return (
    <Pressable style={[styles.pressable]}>
      <View style={[styles.icon_container]}>
        <Svg width={24} height={24} viewBox="0 0 24 24">
          <Path
            d="M12 4C6.9 4 3 7.1 3 10.9c0 2.4 1.6 4.5 4 5.7l-1 3.6c-.1.4.3.7.7.5l4.2-2.8c.4 0 .7.1 1.1.1 5.1 0 9-3.1 9-7.1S17.1 4 12 4z"
            fill={'#000'}
          />
        </Svg>
      </View>

      <Text style={[styles.pressable_text]}>카카오로 시작하기</Text>
    </Pressable>
  )
}



// ==================== Style ==================== //
const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    alignItems:'center',

    height: 48,

    paddingHorizontal: 12,
    
    backgroundColor: '#FEE500',

    borderRadius: 12,
  },

  icon_container: {
    justifyContent: 'center',
    alignContent: 'flex-start',
  },

  pressable_text: {
    flex: 1, 
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.85)',
  }
});

// ==================== Export ==================== //
export default KakaoLoginButton;