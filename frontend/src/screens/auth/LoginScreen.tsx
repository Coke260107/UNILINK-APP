// src/screens/auth/LoginScreen.tsx

import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../utils/globalStyle";
import { Pressable, StyleSheet, Text, View } from "react-native";
import KakaoLoginButton from "../../components/buttons/KakaoLoginButton";

// ==================== Main ==================== //
const LoginScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <SafeAreaView style={[globalStyles.safeAreaView]}>
        <View style={[styles.root_container]}>

          <View style={[styles.top_container]}>
            <Text style={[styles.title]}>UNILINK</Text>
            <Text style={[styles.sub_title]}>모임의 시작, UNILINK</Text>
          </View>

          <View style={[styles.bottom_container]}>
            <KakaoLoginButton onPress={() => null}/>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}



// ==================== Style ==================== //
const styles = StyleSheet.create({
  root_container: {
    flex: 1,

    justifyContent: 'space-between',
  },

  top_container: {
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 80,
  },

  title: {
    fontSize: 40,
    fontWeight: '800',
  },

  sub_title: {
    fontSize: 20,
    fontWeight: '600',
  },

  bottom_container: {
    justifyContent: 'center',
  }
})

// ==================== Export ==================== //
export default LoginScreen;