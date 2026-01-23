import { StyleSheet } from 'react-native';

export const Color = {
  background: 'rgb(250, 250, 250)', // Neutral-50
  border: 'rgb(229, 229, 229)', // Neutral-300

  main: 'rgb(255, 100, 103)', // Red-400

  // Text
  guideText: 'rgb(161, 161, 161)', // Neutral-400
};

const GlobalStyle = StyleSheet.create({
  safeAreaView: {
    flex: 1,

    backgroundColor: Color.background,
  },

  base_container: {
    flex: 1,

    paddingHorizontal: 24,
    paddingBottom: 24,

    backgroundColor: Color.background,
  },
});

export default GlobalStyle;
