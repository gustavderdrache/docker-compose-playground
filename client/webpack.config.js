const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: [
    path.resolve(__dirname, 'src/index.js'),
  ],

  devServer: {
    overlay: true,
    host: '0.0.0.0',
    port: 8081,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
};