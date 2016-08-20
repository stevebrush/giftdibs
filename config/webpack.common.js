var webpack = require('webpack');
var helpers = require('./helpers');

var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    'polyfills': './public/polyfills.ts',
    'vendor': './public/vendor.ts',
    'app': './public/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],
    root: helpers.root('public'),
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        loader: 'raw-loader!sass-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
};
