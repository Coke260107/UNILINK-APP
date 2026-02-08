const Colors = {
  background: 'rgb(250, 250, 250)', // Neutral-50
  border: 'rgb(229, 229, 229)', // Neutral-300
  guide: 'rgb(161, 161, 161)', // Neutral-400
  red: 'rgb(255, 100, 103)', // Red-400
  gray: 'rgb(245,245,245)',
  graypress: 'rgb(105, 105, 150)',
  
  study: {
    main: '#B7C9E2',
    sub: '#EAF0F8',
    point: '#9BCBBE',
    pressed: '#9FB6D8'
  },

  game: {
    main: '#C7B8E2',
    sub: '#F1ECFA',
    point: '#FFB7C5',
    pressed: '#AE9ED6'
  },

  meal: {
    main: '#FFD6C9',
    sub: '#FFF3EE',
    point: '#FFC971',
    pressed: '#FFBFAE'
  },

  exercise: {
    main: '#BFE3C0',
    sub: '#EDF7EE',
    point: '#A3D5FF',
    pressed: '#9FD3A4',
  },
};

export type CategoryColorType = {
  main: string;
  sub: string;
  point: string;
};

export default Colors;
