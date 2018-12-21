/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 * 
 * License MIT
 */
const package = require('./package.json');
const options = package.params;
const kleur = require('kleur');
const minifySettings = require('./build-tools/minify-settings').default
const oldBrowserSettings = require('./build-tools/compatibility-settings').default
const newBrowserSettings = require('./build-tools/current-settings').default
const _compileCss = require('./build-tools/compile-css').run

/**
 * 
 * @param {string} value 
 */
const parseBoolean = (value) => {
  return value === true || value === "true"
}

/**
 * 
 */
const olderBrowsersInputFiles = [
  './src/critical',
  './src/lazy'
]

/**
 * 
 */
const newBrowsersInputFiles = [
  './src/lazy'
]

/**
 * 
 * @param {string} file 
 * @param {object} flags 
 * @param {array}  opts 
 */
const compile = async (file, flags, opts) => {
  await _compileCss(file, flags, opts)
}

process.stdout.write(kleur.blue(`Autoprefixing for   ${options.browsers} browsers 🚑 `) + "\n");
process.stdout.write(kleur.blue(`CustomProperties:   ${parseBoolean(options.customProperties) === true ? kleur.green('true  ✅\n') : kleur.green('false ❌\n')}`));
process.stdout.write(kleur.blue(`ColorFunction:      ${parseBoolean(options.colorFunction) === true ? kleur.green('true  ✅\n') : kleur.green('false ❌\n')}`));
process.stdout.write(kleur.blue(`CustomSelectors:    ${parseBoolean(options.customSelectors) === true ? kleur.green('true  ✅\n') : kleur.green('false ❌\n')}`));
process.stdout.write(kleur.blue(`Sourcemaps:         ${parseBoolean(options.sourcemaps) === true ? kleur.green('true  ✅\n') : kleur.green('false ❌\n')}`));
process.stdout.write(kleur.blue(`Compress:           ${parseBoolean(options.compress) === true ? kleur.green('true  ✅\n') : kleur.green('false ❌\n')}`));

olderBrowsersInputFiles.forEach( file => {
  const flags = {
    minify: true,
    minOpts: minifySettings,
    isIE: true
  }
  compile(file, flags, oldBrowserSettings)
})

newBrowsersInputFiles.forEach( file => {
  const flags = {
    minify: true,
    minOpts: minifySettings
  }
  compile(file, flags, newBrowserSettings)
})
