const resolve = require('path').resolve;
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

/**
 * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
 * by caching the module metadata for all of our npm dependencies. We enable it by default
 * in development.
 */

const dllName = 'feDeps'

const DLLConfig = {
    version: '0.1.0',
    name: dllName,

    /**
     * we need to exclude dependencies which are not intended for the browser
     * by listing them here.
     */
    exclude: [
        'chalk',
        'compression',
        'cross-env',
        'express',
        'ip',
        'minimist',
        'sanitize.css',
    ],

    /**
     * Specify any additional dependencies here. We include core-js and lodash
     * since a lot of our dependencies depend on them and they get picked up by webpack.
     */
    include: [
        'core-js',
        'eventsource-polyfill',
        'babel-polyfill',
        'lodash',
    ],

    // The path where the DLL manifest and bundle will get built
    path: resolve(`node_modules/${dllName}`),

    entry(pkg) {
        const dependencyNames = Object.keys(pkg.dependencies)
        const exclude = DLLConfig.exclude
        const include = DLLConfig.include
        const includeDependencies = uniq(dependencyNames.concat(include))

        return {
          [DLLConfig.name]: pullAll(includeDependencies, exclude),
        };
    },
};

module.exports = DLLConfig;
