/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 *
 * License MIT
 */
const {readFile, writeFile} = require('fs').promises;
const brotliSize = require('brotli-size');
const gzipSize = require('gzip-size');
const postcss = require('postcss');
const kleur = require('kleur');

const {current} = require('./current-settings');
const {legacy} = require('./compatibility-settings');
const {minify: minOpts} = require('./minify-settings');

module.exports.compile = async (file, flags) => {
  const plugins = flags.legacy ? legacy : current;

  const contents = await readFile(file, {encoding: 'utf-8'});
  const {css} = await postcss(plugins).process(contents, {from: file, to: `${file.replace('src', 'css').replace('.css', '')}${flags.legacy ? '-ie' : ''}.css`});

  // Non minified
  if (flags.nonMinified) {
    await writeFile(`${file.replace('src', 'css').replace('.css', '')}${flags.legacy ? '-ie' : ''}.css`, css);
    process.stdout.write(kleur.green(`File ${file.replace('src', 'css')}${flags.legacy ? '-ie' : ''}.css [Brotli-size=${brotliSize.sync(css)}, GZip-size=${gzipSize.sync(css)}, Uncompressed-size=${css.length}] was created succesfully 👍 `) + "\n");
  }

  // Minified
  if (flags.minified) {
    const min = await postcss(minOpts).process(css, { from: file });
    await writeFile(`${file.replace('src', 'css').replace('.css', '')}${flags.legacy ? '-ie' : ''}.min.css`, min.css);
    process.stdout.write(kleur.green(`File ${file.replace('src', 'css').replace('.css', '')}${flags.legacy ? '-ie' : ''}.min.css [Brotli-size=${brotliSize.sync(min.css)}, GZip-size=${gzipSize.sync(min.css)}, Uncompressed-size=${min.css.length}] was created succesfully 👍 `) + "\n");
  }
}
