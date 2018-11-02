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
      'from': undefined,
    },
  }),
];


const nano = [
  require('cssnano')
]

const pluginsCurrent = [
  require('postcss-easy-import')({ extensions: '.pcss' }),
  require('postcss-mixins'),
  require('postcss-custom-selectors'),
  require('postcss-nesting'),
  require('autoprefixer')({ 'browsers': options.browsers, 'from': undefined, }),
  require('postcss-custom-media'),
  require('postcss-discard-comments')({ removeAll: true }),
];

process.stdout.write(kleur.blue(`Autoprefixing for ${options.browsers} browsers 🚑 `) + "\n");
process.stdout.write(kleur.blue(`customProperties:   ${parseBoolean(options.customProperties) === true ? kleur.green('true ✅\n') : kleur.green('false ❌\n')}  `));
process.stdout.write(kleur.blue(`colorFunction:      ${parseBoolean(options.colorFunction) === true ? kleur.green('true ✅\n') : kleur.green('false ❌\n')}  `));
process.stdout.write(kleur.blue(`customSelectors:    ${parseBoolean(options.customSelectors) === true ? kleur.green('true ✅\n') : kleur.green('false ❌\n')}  `));
process.stdout.write(kleur.blue(`sourcemaps:         ${parseBoolean(options.sourcemaps) === true ? kleur.green('true ✅\n') : kleur.green('false ❌\n')}  `));
process.stdout.write(kleur.blue(`compress:           ${parseBoolean(options.compress) === true ? kleur.green('true ✅\n') : kleur.green('false ❌\n')}  `));

postcss(pluginsCompatibility).process(
  fs.readFileSync('./src/critical.pcss', 'utf8'),
  { 'browsers': options.browsers, 'from': undefined, removeAll: true }
).then((result) => {
  fs.writeFileSync('./css/critical.css', result.css);

  // Minify
  postcss(nano).process(result.css).then((r) => {
    fs.writeFileSync('./css/critical.min.css', r.css);
    process.stdout.write(kleur.green(`File critical.min.css [Brotli-size=${brotliSize.sync(r.css)}, GZip-size=${gzipSize.sync(r.css)}, Uncompressed-size=${r.css.length}] was created succesfully 👍 `) + "\n");
  });

  process.stdout.write(kleur.green(`File critical.css [Brotli-size=${brotliSize.sync(result.css)}, GZip-size=${gzipSize.sync(result.css)}, Uncompressed-size=${result.css.length}] was created succesfully 👍 `) + "\n");
});

postcss(pluginsCompatibility).process(
  fs.readFileSync('./src/lazy.pcss', 'utf8'),
  { 'browsers': options.browsers, 'from': undefined, removeAll: true }
).then((result) => {
  fs.writeFileSync('./css/lazy-ie.css', result.css);

  // Minify
  postcss(nano).process(result.css).then((r) => {
    fs.writeFileSync('./css/lazy-ie.min.css', r.css);
    process.stdout.write(kleur.green(`File lazy-ie.min.css [Brotli-size=${brotliSize.sync(r.css)}, GZip-size=${gzipSize.sync(r.css)}, Uncompressed-size=${r.css.length}] was created succesfully 👍 `) + "\n")
  });

  process.stdout.write(kleur.green(`File lazy-ie.css [Brotli-size=${brotliSize.sync(result.css)}, GZip-size=${gzipSize.sync(result.css)}, Uncompressed-size=${result.css.length}] was created succesfully 👍 `) + "\n")
});

postcss(pluginsCurrent).process(
  fs.readFileSync('./src/lazy.pcss', 'utf8'),
  { 'browsers': options.browsers, 'from': undefined, removeAll: true }
).then((result) => {
  fs.writeFileSync('./css/lazy.css', result.css);

  // Minify
  postcss(nano).process(result.css).then((r) => {
    fs.writeFileSync('./css/lazy-ie.min.css', r.css);
    process.stdout.write(kleur.green(`File lazy.min.css [Brotli-size=${brotliSize.sync(r.css)}, GZip-size=${gzipSize.sync(r.css)}, Uncompressed-size=${r.css.length}] was created succesfully 👍 `) + "\n")
  });

  process.stdout.write(kleur.green(`File lazy.css [Brotli-size=${brotliSize.sync(result.css)}, GZip-size=${gzipSize.sync(result.css)}, Uncompressed-size=${result.css.length}] was created succesfully 👍 `) + "\n")
});