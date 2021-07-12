const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    uniqueName: 'account',
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'account',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './projects/account/src/app/account/account.module.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
      },
    }),
  ],
};
