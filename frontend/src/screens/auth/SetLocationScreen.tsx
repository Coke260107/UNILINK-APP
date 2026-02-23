// src/screen/auth/SetLocationScreen.tsx

import { SafeAreaView } from 'react-native-safe-area-context';

// Style
import globalStyles from '../../utils/globalStyle';
import { Text } from 'react-native';
import DefaultHeader from '../../components/headers/DefaultHeader';

/* ==================== Main ==================== */
const SetLocationScreen = () => {
  return (
    <>
      <SafeAreaView style={[globalStyles.safeAreaView]}>
        <DefaultHeader />

        <Text>테스트 페이지</Text>
      </SafeAreaView>
    </>
  );
};

/* ==================== Export ==================== */
export default SetLocationScreen;
