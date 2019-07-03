import { Injectable } from '@angular/core';
import { CouponPresetValues } from '@elys/elys-api';
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
  showEventId: boolean = environment.showEventId;
  couponMessageTrasmitted: string = environment.couponMessageTrasmitted;
  couponMessageLegal: string = environment.couponMessageLegal;
  defaultAmount: CouponPresetValues = environment.defaultAmount;
  isEnabledReprintCoupon: boolean = environment.isEnabledReprintCoupon;
  couponDirectPlace: boolean = environment.couponDirectPlace;
  currencyDefault: string = environment.currencyDefault;
}
