// headerStyle.ts

import { StyleSheet } from 'react-native';

// Util
import Colors from '../utility/color';

const styles = StyleSheet.create({
  base_title: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
  },

  home_title: {
    color: Colors.red,
    fontSize: 28,
    fontWeight: '600',
  },

  chatingList_container: {
    marginLeft: 12,
  },
});

export default styles;
