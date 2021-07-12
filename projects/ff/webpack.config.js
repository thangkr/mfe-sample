const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    uniqueName: 'ff',
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'ff',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './projects/ff/src/app/ff/ff.module.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
      },
    }),
  ],
};
