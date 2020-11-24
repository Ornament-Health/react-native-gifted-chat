const path = require('path');
const webpack = require('webpack');

module.exports = async ({ config, mode }) => {
  config.resolve.alias = {
    'react-native$': 'react-native-web',
    'react-native-svg': 'react-native-svg/lib/module/ReactNativeSVG.web'
  };

  config.module.rules.push({
    test: /\.js$|jsx/,
    loader: ['babel-loader'],
  });
  config.module.rules.push({
    test: /\.ts|\.tsx$/,
    loader: ['babel-loader', 'ts-loader'],
  });
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
