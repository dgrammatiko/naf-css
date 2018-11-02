/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 * 
 * License MIT
 */
const fs = require('fs');
const postcss = require('postcss');
const package = require('./package.json');
const options = package.params;
const kleur = require('kleur');
const brotliSize = require('brotli-size');
const gzipSize = require('gzip-size');

const parseBoolean = (value) => {
  return value === true || value === "true"
}

const pluginsCompatibility = [
  require('postcss-easy-import')({ extensions: '.pcss' }),
  require('postcss-mixins'),
  require('postcss-custom-selectors'),
  require('postcss-nesting'),
  require('postcss-custom-media'),
  require('postcss-discard-comments')({ removeAll: true }),
  require('postcss-custom-properties')({
    preserve: true,
    exportTo: 'css/properties.css'
  }),
  require('postcss-preset-env')({
    stage: 4,
    features: {
      'nesting-rules': true,
    },
    autoprefixer: {
      grid: true,
      browsers: "ie 11",
    },
  }),
  // ({
  //   'browsers': options.browsers,
  //   'customProperties': parseBoolean(options.customProperties),
  //   'colorFunction': parseBoolean(options.colorFunction),
  //   'customSelectors': parseBoolean(options.customSelectors),
  //   'sourcemap': parseBoolean(options.sourcemap),
  //   'compress': parseBoolean(options.compress),
  //   'from': undefined,
  // }),

  // require('cssnano')
];


const plugins = [
  require('postcss-easy-import')({ extensions: '.pcss' }),
  require('postcss-mixins'),
  require('postcss-custom-selectors'),
  require('postcss-nested'),
  require('autoprefixer'),
  require('postcss-custom-media'),
  require('postcss-discard-comments')
]

const pluginsCurrent = [
  require('postcss-easy-import')({ prefix: '_', extensions: '.pcss' }),
  require('postcss-mixins'),
  require('postcss-custom-selectors'),
  require('postcss-nesting'),
  require('autoprefixer')({ 'browsers': options.browsers, 'from': undefined, }),
  require('postcss-custom-media'),
  require('postcss-discard-comments')({ removeAll: true }),
  require('cssnano')
];

process.stdout.write(kleur.blue(`Autoprefixing for ${options.browsers} browsers 🚑 `) + "\n")
process.stdout.write(kleur.blue(`customProperties:   ${kleur.green(options.customProperties)} ✅ `) + "\n")
process.stdout.write(kleur.blue(`colorFunction:      ${kleur.green(options.colorFunction)} ✅ `) + "\n")
process.stdout.write(kleur.blue(`customSelectors:    ${kleur.green(options.customSelectors)} ✅ `) + "\n")
process.stdout.write(kleur.blue(`sourcemaps:         ${kleur.green(options.sourcemap)} ✅ `) + "\n")
process.stdout.write(kleur.blue(`compress:           ${kleur.green(options.compress)} ✅ `) + "\n")

postcss(pluginsCompatibility).process(
  fs.readFileSync('./src/critical.pcss', 'utf8'),
  { 'browsers': options.browsers, 'from': undefined, removeAll: true }
).then(function (result) {
  fs.writeFileSync('./css/critical.css', result.css);

  const newFile = result.css;
  process.stdout.write(kleur.green(`File critical.css [Brotli-size=${brotliSize.sync(newFile)}, GZip-size=${gzipSize.sync(newFile)}, Uncompressed-size=${newFile.length}] was created succesfully 👍 `) + "\n");
});

// postcss(plugins).process(
//   fs.readFileSync('./src/critical-form.pcss', 'utf8'),
//   { 'browsers': options.browsers, 'from': undefined, removeAll: true }
// ).then(function (result) {
//   fs.writeFileSync('./css/critical-form.css', result.css);
//   process.stdout.write(kleur.green(`The file critical-form.css was created succesfully 👍 `) + "\n")
// });

postcss(pluginsCompatibility).process(
  fs.readFileSync('./src/lazy.pcss', 'utf8'),
  { 'browsers': options.browsers, 'from': undefined, removeAll: true }
).then(function (result) {
  fs.writeFileSync('./css/lazy.css', result.css);
  process.stdout.write(kleur.green(`File lazy-loaded.css [Brotli-size=${brotliSize.sync(result.css)}, GZip-size=${gzipSize.sync(result.css)}, Uncompressed-size=${result.css.length}] was created succesfully 👍 `) + "\n")
});

// postcss(pluginsCurrent).process(
//     fs.readFileSync('./src/lazy.pcss', 'utf8'),
//     { 'browsers': options.browsers, 'from': undefined, removeAll: true }
//   ).then(function (result) {
//     fs.writeFileSync('./css/lazy.css', result.css);
//     process.stdout.write(kleur.green(`File lazy-loaded.css [Brotli-size=${brotliSize.sync(result.css)}, GZip-size=${gzipSize.sync(result.css)}, Uncompressed-size=${result.css.length}] was created succesfully 👍 `) + "\n")
//   });
// const processors = [
  // cssnext({
  //   'browsers': options.browsers,
  //   'customProperties': parseBoolean(options.customProperties),
  //   'colorFunction': parseBoolean(options.colorFunction),
  //   'customSelectors': parseBoolean(options.customSelectors),
  //   'sourcemap': parseBoolean(options.sourcemap),
  //   'compress': parseBoolean(options.compress),
  //   'from': undefined,
  // })
// ];
