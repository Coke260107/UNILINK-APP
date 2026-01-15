// globalStyle.ts

import { StyleSheet } from 'react-native';

// Style
import Colors from '../utils/color';

const globalStyle = StyleSheet.create({
  base_scroll_container: {
    flex: 1,

    backgroundColor: Colors.background,
  },

  base_scroll_content_container: {
    paddingHorizontal: 12,
    paddingBottom: 12,

    gap: 12,
  },

  base_card: {
    padding: 16,

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
  },

  base_card_title: {
    fontSize: 18,
    fontWeight: '800',
  },

  base_guide: {
    fontSize: 14,
    color: Colors.guide,
  },
});

export default globalStyle;
