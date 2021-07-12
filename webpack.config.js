const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const WebpackMessages = require('webpack-messages');
const del = require('del');

// theme name
const themeName = 'metronic';
// global variables
const rootPath = path.resolve(__dirname);
const distPath = rootPath + '/src/assets';

const entries = {
  'css/style.angular': './src/assets/sass/style.angular.scss',
};

// remove older folders and files
(async () => {
  await del.sync(distPath + '/css', { force: true });
})();

// MFE
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  performance: {
    hints: false,
  },
  entry: entries,
  output: {
    uniqueName: 'shell',
    // main output path in assets folder
    path: distPath,
    // output path based on the entries' filename
    filename: '[name].js',
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false,
  },
  resolve: { extensions: ['.scss'] },
  plugins: [
    // webpack log message
    new WebpackMessages({
      name: themeName,
      logger: str => console.log(`>> ${str}`),
    }),
    // create css file
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WebpackRTLPlugin({
      filename: '[name].rtl.css',
    }),
    {
      apply: compiler => {
        // hook name
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', compilation => {
          (async () => {
            await del.sync(distPath + '/css/*.js', { force: true });
          })();
        });
      },
    },
    new ModuleFederationPlugin({
      remotes: {},
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
      },
    }),
  ],
};
