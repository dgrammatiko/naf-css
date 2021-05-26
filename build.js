/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 *
 * License MIT
 */
const { readdir, copyFile, mkdir } = require('fs').promises;
const rimraf = require('rimraf');
const { compile } = require('./build-tools/compile-css');

(async () => {
  const forExec = [];
  const files = await readdir('./src');

  files.forEach(file => {
    if (file.startsWith('_') || !file.endsWith('.css')) return;
    forExec.push(compile(`src/${file}`, {legacy: false, nonMinified: false, minified: true}));
    // forExec.push(compile(`src/${file}`, {legacy: true}));
  });

  Promise.all(forExec).catch(err => console.dir(err));

  rimraf.sync('docs');

  await mkdir('docs/css', {recursive: true});

  forExec.length = 0;
  const filesDist = await readdir('./css');

  filesDist.forEach(file => {
    forExec.push(copyFile(`css/${file}`, `docs/css/${file}`));
  });

  forExec.push(copyFile(`kitchen-shink.html`, `docs/index.html`));
  forExec.push(copyFile(`kitchen-shink2.html`, `docs/index2.html`));

  Promise.all(forExec).catch(err => console.dir(err));
})();
