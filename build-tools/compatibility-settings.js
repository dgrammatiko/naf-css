/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 *
 * License MIT
 */
module.exports.legacy = [
  require('postcss-easy-import'),
  require('postcss-mixins'),
  require('postcss-custom-selectors'),
  require('postcss-nested'),
  require('autoprefixer'),
  require('postcss-custom-media'),
  require('postcss-discard-comments'),
  // require('postcss-custom-properties')({
  //   preserve: true,
  //   exportTo: 'css/properties.css'
  // }),
  require('postcss-preset-env')({
    autoprefixer: {
      grid: true,
      overrideBrowserslist: "ie 11",
      from: undefined,
    },
    features: {
      'nesting-rules': true,
    },
  }),
];
