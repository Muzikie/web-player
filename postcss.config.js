const postcssPartialImport = require('postcss-partial-import');
const postcssNesting = require('postcss-nesting');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({}),
    postcssPartialImport({}),
    postcssNesting({}),
  ],
};
