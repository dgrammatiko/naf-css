/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 * 
 * License MIT
 */
module.exports.default = [
  require('postcss-easy-import')({ extensions: '.pcss' }),
  require('postcss-mixins'),
  require('postcss-custom-selectors'),
  require('postcss-nesting'),
  require('autoprefixer'),
  require('postcss-custom-media'),
  require('postcss-discard-comments')({ removeAll: true }),
  require('postcss-preset-env')({
      autoprefixer: {
      grid: true,
      browsers: "last 1 version",
      from: undefined,
    },
    features: {
      'nesting-rules': true,
    },
    removeAll: true
  }),
];
