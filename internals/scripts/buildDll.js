// No need to build the DLL in production
if (process.env.NODE_ENV === 'production') {
    process.exit(0)
}

require('shelljs/global')

const path = require('path')
const fs = require('fs')
const exists = fs.existsSync
const writeFile = fs.writeFileSync

const pkg = require(path.join(process.cwd(), 'package.json'))
const dllConfig = require('../dllConfig')

const outputPath = dllConfig.path
const dllManifestPath = path.join(outputPath, 'package.json')

mkdir('-p', outputPath)

echo('Building the Webpack DLL...')

/**
 * Create a manifest so npm install doesn't warn us
 */
if (!exists(dllManifestPath)) {
    const dllManifest = {
        name: dllConfig.name,
        private: true,
        author: pkg.author,
        repository: pkg.repository,
        version: pkg.version,
    }
    writeFile(
        dllManifestPath,
        JSON.stringify(dllManifest, null, 2),
        'utf8'
    )
}

// the BUILDING_DLL env var is set to avoid confusing the development environment
exec('BUILDING_DLL=true webpack --display-chunks --color --config internals/webpack/webpack.dll.babel.js --hide-modules')
