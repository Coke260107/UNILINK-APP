import { StyleSheet } from 'react-native';
import Colors from '../../utils/color';

const styles = StyleSheet.create({
  top_container: {
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 80,
  },

  title: {
    fontSize: 42,
    fontWeight: '800',
  },

  subTitle: {
    fontSize: 24,
    fontWeight: '600',

    color: Colors.guide,
  },

  bottom_container: {
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});

export default styles;
