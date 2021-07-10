const { share, SharedMappings } = require('@angular-architects/module-federation/webpack');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const sharedMappings = new SharedMappings();

sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */],
);

module.exports = {
  output: {
    uniqueName: 'order',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'order',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './projects/order/src/app/mfe.module.ts',
      },
      shared: share({
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
