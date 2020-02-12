/**
 * Build script
 *
 * Dimitris Grammatikogiannis November 2018
 * 
 * License MIT
 */
module.exports.default = [
  require('postcss-normalize')({ overrideBrowserslist: 'ie 11' }),
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
