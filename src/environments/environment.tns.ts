import { environment as devEnvironment } from './environment';
import { environment as genc01Environment } from './environment.genc01';
import { environment as genc01StagingEnvironment } from './environment.genc01-staging';
import { environment as genc02Environment } from './environment.genc02';
import { environment as genc02StagingEnvironment } from './environment.genc02-staging';
import { environment as genc03Environment } from './environment.genc03';
import { environment as genc03StagingEnvironment } from './environment.genc03-staging';
import { environment as mayabetEnvironment } from './environment.mayabet';
import { environment as mayabetStagingEnvironment } from './environment.mayabet-staging';
import { Environment } from './environment.models';
import { environment as onewayEnvironment } from './environment.oneway';
import { environment as onewayStagingEnvironment } from './environment.oneway-staging';
import { environment as prodEnvironment } from './environment.prod';
import { environment as shawisEnvironment } from './environment.shawis';
import { environment as shawisStagingEnvironment } from './environment.shawis-staging';
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
      case 'shawis-prod':
        envVars = shawisEnvironment;
        break;
      case 'shawis-staging':
        envVars = shawisStagingEnvironment;
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
      case 'genc01-prod':
        envVars = genc01Environment;
        break;
      case 'genc01-staging':
        envVars = genc01StagingEnvironment;
        break;
      case 'genc02-prod':
        envVars = genc02Environment;
        break;
      case 'genc02-staging':
        envVars = genc02StagingEnvironment;
        break;
      case 'genc03-prod':
        envVars = genc03Environment;
        break;
      case 'genc03-staging':
        envVars = genc03StagingEnvironment;
        break;
      default:
        envVars = devEnvironment;
    }
  } else {
    envVars = devEnvironment;
  }

  return envVars;
})();
