export interface Environment {
  production: boolean;
  baseApiUrl?: string;
  staging?: boolean;
  pageTitle?: string;
  theme?: string;
  currency?: string;
  products: Products[];
  showRaceId: boolean;
  couponMessageTrasmitted?: string;
  couponMessageLegal?: string;
  isEnabledReprintCoupon: boolean;
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
  defaultAmount: number[];
  toolbarButton: ToolbarButtons;
  widgets?: Widget[];

}

export interface Widget {
  name: string;
  routing: string;
  typeLink?: WidgetTypeLink;
  outletRouter?: string;
  icon: string;
}

export enum  WidgetTypeLink {
  MODAL,
  OUTLET
}
