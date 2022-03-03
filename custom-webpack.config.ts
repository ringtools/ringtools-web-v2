import * as webpack from 'webpack';
import {
  CustomWebpackBrowserSchema,
  TargetOptions,
} from '@angular-builders/custom-webpack';
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

export default (
  config: webpack.Configuration,
  _options: CustomWebpackBrowserSchema,
  _targetOptions: TargetOptions
) => {
  config.plugins?.push(new Dotenv({
      allowEmptyValues: true,
      systemvars: true,
      defaults: true
  }));

  config.plugins?.push(new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
}));

  return config;
};
