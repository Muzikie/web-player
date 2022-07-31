const path = require('path');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExctractPlugin = require('mini-css-extract-plugin');
const postcssPartialImport = require('postcss-partial-import');
const postcssMixins = require('postcss-mixins');
const postcssNesting = require('postcss-nesting');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@mock': resolve('./mock'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {

            loader: MiniCssExctractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssPartialImport({}),
                  postcssMixins({}),
                  postcssNesting({}),
                ],
              },
            },
          },
        ],
      },
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
      //   exclude: [/images/],
      //   options: {
      //     name: '[path][name]-[hash:6].[ext]',
      //   },
      //   loader: 'file-loader',
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [/fonts/],
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExctractPlugin({
      filename: 'styles.css',
    }),
  ],
};
