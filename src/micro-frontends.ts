import { MicroFrontend, MicroFrontendConfig } from 'ng-module-federation';

export const microFrontends: MicroFrontendConfig = {
  ff: new MicroFrontend('http://localhost:4210/remoteEntry.js', 'ff', 'ff', 'FFModule'),
  account: new MicroFrontend('http://localhost:4220/remoteEntry.js', 'account', 'account', 'AccountModule'),
};
