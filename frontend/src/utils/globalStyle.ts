import { StyleSheet } from 'react-native';

// Util
import PALETTE from './color';

// ==================== Main ==================== //
const globalStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,

    paddingHorizontal: 12,
    paddingBottom: 12,

    backgroundColor: PALETTE.background,
  },
});

// ==================== Export ==================== //
export default globalStyles;
