// src/components/headers/DefaultHeader.tsx

import { Pressable, StyleSheet, View } from 'react-native';

// Icon
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Style
import PALETTE from '../../utils/color';

/* ==================== Main ==================== */
const DefaultHeader = () => {
  const checkNicknameDuplication = () => {};

  return (
    <>
      <View style={[styles.container]}>
        <Pressable>
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
