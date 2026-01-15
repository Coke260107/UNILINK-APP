import { StyleSheet } from 'react-native';
import Colors from '../utils/color';

const styles = StyleSheet.create({
  category_container: {
    flexDirection: 'row',
    gap: 12,
  },

  category_button: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    minWidth: 75,

    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
  },

  category_button_Text: {
    fontSize: 16,
    fontWeight: '600',
  },

  category_button_selected: {
    borderColor: Colors.main,
  },
});

export default styles;
