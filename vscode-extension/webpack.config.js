//@ts-check

'use strict'

const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node', // vscode extensions run in a Node.js-context
  entry: './src/extension.ts',
  output: {
    // the bundle is stored in the 'dist' folder (check package.json)
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      EXT_NAME: 'AtCoder Simplify',
    }),
  ],
  devtool: 'source-map',
  externals: [
    {
      vscode: 'commonjs vscode',
    },
    nodeExternals(),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      '@vscode': path.resolve(__dirname, 'src'),
      '@browser': path.resolve(__dirname, '../web-extension/src'),
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
module.exports = config
