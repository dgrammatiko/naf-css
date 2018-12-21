/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 * 
 * License MIT
 */
const fs = require('fs');
const brotliSize = require('brotli-size');
const gzipSize = require('gzip-size');
const postcss = require('postcss');
const kleur = require('kleur');

module.exports.run = (file, flags, opts) => {
  postcss(opts).process(
      fs.readFileSync(`${file}.pcss`, 'utf8'),
      { from: undefined, removeAll: true })
  .then((result) => {
      fs.writeFileSync(`${file.replace('src', 'css')}${flags.isIE ? '-ie' : ''}.css`, result.css);
      process.stdout.write(kleur.green(`File ${file.replace('src', 'css')}${flags.isIE ? '-ie' : ''}.css [Brotli-size=${brotliSize.sync(result.css)}, GZip-size=${gzipSize.sync(result.css)}, Uncompressed-size=${result.css.length}] was created succesfully 👍 `) + "\n");

      if (flags.minify) {
        // Minify
        postcss(flags.minOpts).process(result.css, { from: undefined }).then((r) => {
          fs.writeFileSync(`${file.replace('src', 'css')}${flags.isIE ? '-ie' : ''}.min.css`, r.css);
          process.stdout.write(kleur.green(`File ${file.replace('src', 'css')}${flags.isIE ? '-ie' : ''}.min.css [Brotli-size=${brotliSize.sync(r.css)}, GZip-size=${gzipSize.sync(r.css)}, Uncompressed-size=${r.css.length}] was created succesfully 👍 `) + "\n");
        });
      }
  });
}
