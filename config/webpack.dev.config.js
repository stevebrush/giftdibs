const helpers = require('./helpers');

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BUILD_PATH = 'dist';

module.exports = webpackMerge(commonConfig, {

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        port: 8080,
        contentBase: BUILD_PATH + '/',
        inline: true,
        progress: true,
        profile: true,
        watch: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    plugins: [
        // Where to insert script and link tags:
        new HtmlWebpackPlugin({
            template: helpers.root('public/index.html'),
            filename: helpers.root(BUILD_PATH + '/index.html')
        })
    ]
});
