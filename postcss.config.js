module.exports = {
  plugins: [
    require("postcss-import"),
    require('postcss-mixins'),
    require('postcss-nesting'),
    require('postcss-discard-comments')({ removeAll: true }),
    require('postcss-preset-env')({
      autoprefixer: {
        grid: true,
        overrideBrowserslist: [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version",
          "last 1 ie version"
        ],
        from: undefined,
      },
      features: {
        'nesting-rules': true,
      },
      removeAll: true
    }),
    require('cssnano')({from: undefined })
  ]
}
