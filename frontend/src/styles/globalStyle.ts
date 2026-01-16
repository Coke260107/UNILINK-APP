// globalStyle.ts

import { StyleSheet } from 'react-native';

// Style
import Colors from '../utils/color';

const globalStyle = StyleSheet.create({
  scroll_container: {
    flex: 1,

    backgroundColor: Colors.background,
  },

  scroll_content_container: {
    paddingHorizontal: 12,
    paddingBottom: 12,

    gap: 12,
  },

  card: {
    padding: 16,

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
  },

  card_title: {
    fontSize: 20,
    fontWeight: '800',
  },

  guide_text: {
    fontSize: 14,
    color: Colors.guide,
  },
});

export default globalStyle;
