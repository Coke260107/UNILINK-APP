// headerStyle.ts

import { StyleSheet } from 'react-native';

// Util
import Colors from '../../utils/color';

const styles = StyleSheet.create({
  base_title: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
  },

  home_title: {
    color: Colors.main,
  },

  chatingList_container: {
    marginRight: 16,
  },
});

export default styles;
