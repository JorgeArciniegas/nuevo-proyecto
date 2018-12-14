export interface Environment {
  production: boolean;
  staging?: boolean;
  pageTitle?: string;
  theme?: string;
  currency?: string;
  products: Products[];
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
