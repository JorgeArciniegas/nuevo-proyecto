export interface Environment {
  production: boolean;
  staging?: boolean;
  pageTitle?: string;
  theme?: string;
  toolbarButtons?: ToolbarButtons[];
  currency?: string;
  products: Products[];
}

export interface ToolbarButtons {
  name: string;
  icon: string;
}
export interface Products {
  name: string;
  label: string;
  defaultAmount: number[];
}
