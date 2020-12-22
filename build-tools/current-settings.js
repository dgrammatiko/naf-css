/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 *
 * License MIT
 */
module.exports.current = [
  require('postcss-easy-import'),
  require('postcss-mixins'),
  require('postcss-custom-selectors'),
  require('postcss-nested'),
  require('autoprefixer'),
  require('postcss-custom-media'),
  require('postcss-discard-comments'),
  require('postcss-preset-env')({
    autoprefixer: {
      grid: true,
      overrideBrowserslist: "last 1 version",
      from: undefined,
    },
    features: {
      'nesting-rules': true,
    },
  }),
];
