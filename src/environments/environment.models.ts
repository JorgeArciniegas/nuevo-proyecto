export interface Environment {
  production: boolean;
  baseApiUrl?: string;
  staging?: boolean;
  pageTitle?: string;
  theme?: string;
  currency?: string;
  products: Products[];
  showRaceId: boolean;
}

export interface ToolbarButtons {
  name?: string;
  icon: string;
  route: string;
}
export interface Products {
  name: string;
  label: string;
  defaultAmount: number[];
  toolbarButton: ToolbarButtons;
}
