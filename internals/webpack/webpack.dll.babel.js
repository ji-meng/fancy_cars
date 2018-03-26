/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

const { join } = require('path')
const webpack = require('webpack')
const pkg = require(join(process.cwd(), 'package.json'))
const dllConfig = require('../dllConfig')

const outputPath = dllConfig.path

module.exports = require('./webpack.base.babel')({
    context: process.cwd(),
    entry: dllConfig.entry(pkg),
    devtool: 'eval',
    output: {
        filename: '[name].dll.js',
        path: outputPath,
        library: '[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: join(outputPath, '[name].json'),
        }),
    ],
    performance: {
        hints: false,
    },
})
