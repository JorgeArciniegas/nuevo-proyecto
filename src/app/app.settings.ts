import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Products } from '../environments/environment.models';
@Injectable()
export class AppSettings {
  baseApiUrl: string = environment.baseApiUrl;
  production: boolean = environment.production;
  staging: boolean = environment.staging;
  pageTitle: string = environment.pageTitle;
  theme: string = environment.theme;
  supportedLang: string[] = environment.supportedLang;
  products: Products[] = environment.products;
  showRaceId: boolean = environment.showRaceId;
  couponMessageTrasmitted: string = environment.couponMessageTrasmitted;
  couponMessageLegal: string = environment.couponMessageLegal;
}
