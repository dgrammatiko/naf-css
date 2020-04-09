/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 * 
 * License MIT
 */
const kleur = require('kleur');
const { exec } = require('child_process');
const { readdir } = require('fs').promises;

readdir('./src')
  .then(files => {
    files.forEach(file => {
      if (file.startsWith('_') || !file.endsWith('.pcss')) return;
      process.stdout.write(`${kleur.red(`File: src/${file}`)} ${kleur.blue(`Compress: ${ kleur.green('true  ✅\n') }`)}`);
      exec(`npx postcss src/${file} -o css/${file.replace('.pcss', '.css')}`);
    });
  })
  .catch(err => console.dir(err));
