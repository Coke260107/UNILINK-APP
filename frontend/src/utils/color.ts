const PALETTE = {
  // UI
  main: 'rgba(255, 100, 103, 1)', // red-400
  disable: 'rgba(255, 201, 201, 1)', // red-200
  panel: 'rgba(250, 250, 249, 1)', // stone-50
  background: 'rgba(245, 245, 244, 1)', // stone-100

  // Text & Border
  text_disable: 'rgba(68, 64, 59, 1)',
  text: 'rgba(68, 64, 59, 1)',
  text_guide: 'rgba(39, 39, 42, 1)',
  border: 'rgba(121, 113, 107, 0.25)', // stone-500/25
};

export const CATEGORY_PALETTE = {
  study: {
    main: 'rgba(184, 230, 254, 0.5)', // sky-200/50
    border: 'rgba(0, 89, 138, 0.2)', // sky-800/20
  },

  game: {
    main: 'rgba(233, 213, 255, 0.5)', // purple-200/50
    border: 'rgba(110, 17, 176, 0.2)', // purple-800/20
  },

  meal: {
    main: 'rgba(254, 215, 170, 0.5)', // orange-200/50
    border: 'rgba(159, 45, 0, 0.2)', // orange-800/20
  },

  exercise: {
    main: 'rgba(167, 243, 208, 0.5)', // emerald-200/50
    border: 'rgba(0, 96, 69, 0.2)', // emerald-800/20
  },
};

export default PALETTE;
