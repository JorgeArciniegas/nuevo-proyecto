import { environment as prodEnvironment } from './environment.prod';
import { environment as vgenEnvironment } from './environment.vgen';
import { environment as vgenStagingEnvironment } from './environment.vgen-staging';
import { environment as universalSoftEnvironment } from './environment.universalsoft';
import { environment as universalSoftStagingEnvironment } from './environment.universalsoft-staging';
import { environment as devEnvironment } from './environment';
import { Environment } from './environment.models';

export const environment: Environment = (() => {
  let envVars;

  if (
    typeof process !== 'undefined' &&
    process &&
    Object.prototype.hasOwnProperty.call(process, 'env') &&
    process.env &&
    Object.prototype.hasOwnProperty.call(process.env, 'environment') &&
    process.env.environment
  ) {
    switch (process.env.environment) {
      case 'prod':
        envVars = prodEnvironment;
        break;
      case 'vgen-prod':
        envVars = vgenEnvironment;
        break;
      case 'vgen-staging':
        envVars = vgenStagingEnvironment;
        break;
      case 'universalsoft-prod':
        envVars = universalSoftEnvironment;
        break;
      case 'universalsoft-staging':
        envVars = universalSoftStagingEnvironment;
        break;
      default:
        envVars = devEnvironment;
    }
  } else {
    envVars = devEnvironment;
  }

  return envVars;
})();
