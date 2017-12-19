const path = require('path');

require('dotenv-safe').load();

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
  }),
  new webpack.EnvironmentPlugin([
    'NODE_ENV',
    'PARSE_APP_ID',
    'PARSE_SERVER_URL',
  ]),
];

if (isProduction) {
  plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha1',
      hashDigest: 'base64',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
  );
} else {
  plugins.push(
    new webpack.NamedModulesPlugin(),
  );
}

const { WEBPACK_PUBLIC_PATH: publicPath } = process.env;
const publicPathOptions = publicPath ? { publicPath } : {};

module.exports = {
  devtool: isProduction ? false : 'source-map',

  entry: path.resolve(__dirname, 'src/index.tsx'),

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
    ...publicPathOptions,
  },

  devServer: {
    overlay: true,
    host: '0.0.0.0',
    port: 8081,
    before() {
      // Kill self on SIGTERM (docker-compose down sends us this)
      process.on('SIGTERM', () => {
        process.exit(0);
      });
    },
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            useCache: true,
          },
        },
      },
    ],
  },

  plugins,
};