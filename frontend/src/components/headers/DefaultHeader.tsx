// src/components/headers/DefaultHeader.tsx

import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Icon
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Style
import PALETTE from '../../utils/color';

/* ==================== Main ==================== */
const DefaultHeader = () => {
  const navigation = useNavigation();
  const checkNicknameDuplication = () => {};

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <>
      <View style={[styles.container]}>
        <Pressable onPress={handleBack}>
          <FontAwesome6
            name="angle-left"
            iconStyle="solid"
            size={20}
            color={'rgba(0, 0, 0, 1)'}
          />
        </Pressable>
      </View>
    </>
  );
};

/* ==================== Style ==================== */
const styles = StyleSheet.create({
  container: {
    height: 56,

    justifyContent: 'center',

    backgroundColor: PALETTE.background,
  },
});

/* ==================== Export ==================== */
export default DefaultHeader;
