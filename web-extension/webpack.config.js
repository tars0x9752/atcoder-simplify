'use strict'
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        context: 'src',
        from: 'manifest.json',
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      '@vscode': path.resolve(__dirname, '../vscode-extension/src'),
      '@browser': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
}
