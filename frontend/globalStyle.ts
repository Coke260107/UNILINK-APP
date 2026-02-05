import { StyleSheet } from 'react-native';

export const Color = {
  background: 'rgb(250, 250, 250)', // Neutral-50
  border: 'rgba(161, 161, 161, 0.4)', // Neutral-400/40

  main: 'rgb(251, 44, 54)', // Red-500
  main_disabled: 'rgb(255, 100, 103)', // Red-400
  main_pressed: 'rgb(231, 0, 11)', // Red-600

  // Text
  text: 'black',
  button_text: 'white',

  text_disabled: 'rgba(255, 255, 255, 0.5)',
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
  },
});

export default GlobalStyle;
