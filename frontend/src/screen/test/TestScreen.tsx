// src/screen/test/TestScreen.tsx
import { StyleSheet, Text, View } from 'react-native';

// Style
import GlobalStyle from '../../../globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

// ==================== Main ==================== //
const TestScreen = () => {
  return (
    <>
      <SafeAreaView style={[GlobalStyle.safeAreaView]}>
        <View style={[GlobalStyle.base_container, styles.root_container]}>
          <Text>테스트 페이지</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

// ==================== Style ==================== //
const styles = StyleSheet.create({
  root_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// ==================== Export ==================== //
export default TestScreen;
