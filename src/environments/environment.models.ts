export interface Environment {
  production: boolean;
  staging?: boolean;
  pageTitle?: string;
  theme?: string;
  toolbarButtons?: ToolbarButtons[];
}

export interface ToolbarButtons {
  name: string;
  icon: string;
}
