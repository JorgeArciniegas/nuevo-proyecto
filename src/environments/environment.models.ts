import { CouponPresetValues } from "@elys/elys-api";
import { MatRadioChange } from "@angular/material";

export interface Environment {
  production: boolean;
  baseApiUrl?: string;
  staging?: boolean;
  pageTitle?: string;
  theme?: string;
  // Array of the supported languages. The first element of the array is the default language.
  supportedLang?: string[];
  currency?: string;
  products: Products[];
  showRaceId: boolean;
  couponMessageTrasmitted?: string;
  couponMessageLegal?: string;
  isEnabledReprintCoupon: boolean;
  defaultAmount?: CouponPresetValues;
  couponDirectPlace: boolean;
  currencyDefault: string;
}

export interface ToolbarButtons {
  name?: string;
  icon: string;
  route: string;
}
export interface Products {
  sportId: number;
  name: string;
  codeProduct: string;
  label: string;
  productSelected?: boolean;
  isPlayable?: boolean;
  order: number;
  toolbarButton: ToolbarButtons;
  widgets?: Widget[];
  layoutResultList: LayoutResultList; // accept race, fight, soccer, keno
}

export interface Widget {
  name: string;
  routing: string;
  typeLink?: WidgetTypeLink;
  outletRouter?: string;
  icon: string;
}

export enum WidgetTypeLink {
  MODAL,
  OUTLET
}

/**
 * @name LayoutResultList
 * @property 'name' is the layout type
 * @property 'items' is the number of elements displayed
 * @example: layoutResultList: { name: LAYOUT_RESULT_LIST_TYPE.RACING, items: 4 }
 */
export interface LayoutResultList {
  name: LAYOUT_RESULT_LIST_TYPE;
  items: number;
}


export enum LAYOUT_RESULT_LIST_TYPE  {
  RACING,
  COCK_FIGHT,
  SOCCER
}
