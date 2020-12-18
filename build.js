/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 *
 * License MIT
 */
const { readdir } = require('fs').promises;
const { compile } = require('./build-tools/compile-css');

(async () => {
  const forExec = [];
  const files = await readdir('./src');

  files.forEach(file => {
    if (file.startsWith('_') || !file.endsWith('.css')) return;
    forExec.push(compile(`src/${file}`, {legacy: false}));
    forExec.push(compile(`src/${file}`, {legacy: true}));
  });

  Promise.all(forExec).catch(err => console.dir(err));
})();
