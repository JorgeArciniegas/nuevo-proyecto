import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Environment } from '../environments/environment.models';
import { environment as environmentProd } from '../environments/environment.prod';
import { environment as environmentVgen } from '../environments/environment.vgen';
declare let compile: any;

declare var process: any;
@Injectable()
export class AppSettings {
  baseApiUrl: string;
  production: boolean;
  staging: boolean;
  pageTitle: string;
  theme: string;
  products: any[];
  showRaceId: boolean;

  constructor() {
    let env: Environment;
    switch (compile) {
      case 'vgen':
        env = environmentVgen;
        break;
      case 'prod':
        env = environmentProd;
        break;
      default:
        env = environment;
        break;
    }

    this.baseApiUrl = env.baseApiUrl;
    this.production = env.production;
    this.staging = env.staging;
    this.pageTitle = env.pageTitle;
    this.theme = env.theme;
    this.products = env.products;
    this.showRaceId = env.showRaceId;
  }
}
