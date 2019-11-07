import { CouponPresetValues } from '@elys/elys-api';
import { Market } from '../app/products/products.model';

export interface Environment {
  production: boolean;
  bookmakerDetails: string;
  license: LICENSE_TYPE;
  baseApiUrl: string;
  staging?: boolean;
  pageTitle?: string;
  theme?: string;
  // URI to get the skin's favicon
  faviconPath?: string;
  // Array of the supported languages. The first element of the array is the default language.
  supportedLang?: string[];
  currency?: string;
  products: Products[];
  printSettings: PrintSettings;
  showEventId: boolean;
  couponMessageTrasmitted?: string;
  couponMessageLegal?: string;
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
  typeCoupon?: TypeCoupon; // Experimental
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
  isShowHeaderMessage: boolean;
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
  cacheEventsItem: number;
  // List of visible markets on the template. The index of the array is taken to show them on the different rows of the template.
  shownMarkets?: Market[];
}

export enum LAYOUT_TYPE {
  RACING,
  COCK_FIGHT,
  SOCCER,
  KENO
}

// Bookmaker's identifier
export enum LICENSE_TYPE {
  DEMO_LICENSE,
  UNIVERSALSOFT,
  ONEWAY,
  SHAWIS,
  BETESE,
  UGANBET,
  SPORTRACE,
  BOLIVARBET,
  APUESTAS_DOMINICANAS,
  F2O,
  SOFT,
  KYRON
}

export interface TypeCoupon {
  isMultipleStake: boolean;
  acceptMultiStake: boolean;
  typeLayout: LAYOUT_TYPE;
}
