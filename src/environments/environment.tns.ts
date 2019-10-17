import { environment as devEnvironment } from './environment';
import { environment as apigenc01Environment } from './environment.apigenc01';
import { environment as apigenc01StagingEnvironment } from './environment.apigenc01-staging';
import { environment as apigenc02Environment } from './environment.apigenc02';
import { environment as apigenc02StagingEnvironment } from './environment.apigenc02-staging';
import { environment as apigenc03Environment } from './environment.apigenc03';
import { environment as apigenc03StagingEnvironment } from './environment.apigenc03-staging';
import { environment as mayabetEnvironment } from './environment.mayabet';
import { environment as mayabetStagingEnvironment } from './environment.mayabet-staging';
import { Environment } from './environment.models';
import { environment as onewayEnvironment } from './environment.oneway';
import { environment as onewayStagingEnvironment } from './environment.oneway-staging';
import { environment as prodEnvironment } from './environment.prod';
import { environment as universalSoftEnvironment } from './environment.universalsoft';
import { environment as universalSoftStagingEnvironment } from './environment.universalsoft-staging';
import { environment as vgenEnvironment } from './environment.vgen';
import { environment as vgenStagingEnvironment } from './environment.vgen-staging';
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
      case 'oneway-prod':
        envVars = onewayEnvironment;
        break;
      case 'oneway-staging':
        envVars = onewayStagingEnvironment;
        break;
      case 'universalsoft-prod':
        envVars = universalSoftEnvironment;
        break;
      case 'universalsoft-staging':
        envVars = universalSoftStagingEnvironment;
        break;
      case 'mayabet-prod':
        envVars = mayabetEnvironment;
        break;
      case 'mayabet-staging':
        envVars = mayabetStagingEnvironment;
        break;
      case 'apigenc01-prod':
        envVars = apigenc01Environment;
        break;
      case 'apigenc01-staging':
        envVars = apigenc01StagingEnvironment;
        break;
      case 'apigenc02-prod':
        envVars = apigenc02Environment;
        break;
      case 'apigenc02-staging':
        envVars = apigenc02StagingEnvironment;
        break;
      case 'apigenc03-prod':
        envVars = apigenc03Environment;
        break;
      case 'apigenc03-staging':
        envVars = apigenc03StagingEnvironment;
        break;
      default:
        envVars = devEnvironment;
    }
  } else {
    envVars = devEnvironment;
  }

  return envVars;
})();
