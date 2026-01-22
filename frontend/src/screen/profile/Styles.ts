import { StyleSheet } from 'react-native';

// Style
import Colors from '../../utility/color';

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',

    marginTop: 12,
    marginBottom: 48,
  },

  textInput: {
    height: 52,

    fontSize: 20,

    borderBottomWidth: 2,
  },

  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 48,
    backgroundColor: Colors.main,
    borderRadius: 12,
  },

  nextButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
