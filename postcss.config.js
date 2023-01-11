const postcssImport = require('postcss-import');
const postcssNesting = require('postcss-nesting');
const autoprefixer = require('autoprefixer');
const postcssImportGlob = require('postcss-import-ext-glob')

module.exports = {
  plugins: [autoprefixer({}), postcssImportGlob({}), postcssImport({}), postcssNesting({})],
};
