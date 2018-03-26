/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const logger = require('../../server/logger');
const dllConfig = require('../dllConfig')

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        inject: true,
        template: 'app/index.html',
    }),
    new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: false,
    }),
    new AddAssetHtmlPlugin({
        filepath: path.resolve(dllConfig.path, `${dllConfig.name}.dll.js`),
        includeSourcemap: false,
    })
]

module.exports = require('./webpack.base.babel')({
    entry: [
        'eventsource-polyfill',
        'webpack-hot-middleware/client?reload=true',
        path.join(process.cwd(), 'app/app.js'),
    ],

    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    plugins: dependencyHandlers().concat(plugins), // eslint-disable-line no-use-before-define
    devtool: 'cheap-module-source-map',
    performance: {
        hints: false,
    },
})

/**
 * Select which plugins to use to optimize the bundle's handling of
 * third party dependencies.
 *
 * If there is a dllPlugin key on the project's package.json, the
 * Webpack DLL Plugin will be used.  Otherwise the CommonsChunkPlugin
 * will be used.
 *
 */
function dependencyHandlers() {
    // Don't do anything during the DLL Build step
    if (process.env.BUILDING_DLL) { return []; }

    const manifestPath = path.resolve(dllConfig.path, `${dllConfig.name}.json`)

    if (!fs.existsSync(manifestPath)) {
        logger.error('The DLL manifest is missing. Please run `make install`')
        process.exit(0)
    }

    return [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(manifestPath), // eslint-disable-line global-require
      }),
    ];
}
