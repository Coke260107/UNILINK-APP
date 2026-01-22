module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],

    // ⚠️ 반드시 맨 마지막
    'react-native-worklets/plugin',
  ],
};
