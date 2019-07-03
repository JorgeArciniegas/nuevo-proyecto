import { CouponPresetValues } from '@elys/elys-api';

export interface Environment {
  production: boolean;
  companyDetails: string;
  license: LICENSE_TYPE;
  baseApiUrl?: string;
  staging?: boolean;
  pageTitle?: string;
  theme?: string;
  // Array of the supported languages. The first element of the array is the default language.
  supportedLang?: string[];
  currency?: string;
  products: Products[];
  printSettings: PrintSettings;
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
  layoutProducts: LayoutProducts; // accept race, fight, soccer, keno
}

export interface Widget {
  name: string;
  routing: string;
  typeLink?: WidgetTypeLink;
  outletRouter?: string;
  icon: string;
}

// Setting on the print feature
export interface PrintSettings {
  isEnabledReprintCoupon: boolean;
  isTrasmitionInfoMessageShown: boolean;
}

export enum WidgetTypeLink {
  MODAL,
  OUTLET
}

/**
 * @name LayoutProducts
 * @property 'type' is the layout type
 * @property 'resultItems' is the number of elements displayed into the results area
 * @example: layoutProducts: { type: LAYOUT_TYPE.RACING, resultItems: 4 }
 */
export interface LayoutProducts {
  type: LAYOUT_TYPE;
  resultItems: number;
  nextEventItems: number;
}

export enum LAYOUT_TYPE {
  RACING,
  COCK_FIGHT,
  SOCCER,
  KENO
}

export enum LICENSE_TYPE {}
