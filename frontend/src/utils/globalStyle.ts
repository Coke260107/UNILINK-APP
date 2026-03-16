import { StyleSheet } from 'react-native';

// Util
import PALETTE from './color';

// ==================== Main ==================== //
const globalStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,

    paddingHorizontal: 16,
    paddingBottom: 16,

    backgroundColor: PALETTE.background,
  },

  screen_title: {
    fontSize: 28,
    fontWeight: '800',
    color: 'black',
  },
});

// ==================== Export ==================== //
export default globalStyles;
