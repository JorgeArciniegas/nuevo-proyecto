import { Environment } from './environment.models';

export const environment: Environment = {
  production: false,
  pageTitle: 'VDESK-KIOSK',
  theme: 'develop',
  products: [
    {
      name: 'dogracing',
      label: 'Dog Racing',
      defaultAmount: [1, 2, 5, 10],
      toolbarButton: {
        name: 'dogracing',
        icon: 'icon',
        route: 'products/dogracing'
      }
    },
    {
      name: 'hourseracing',
      label: 'Hourse Racing',
      defaultAmount: [1, 2, 5, 10],
      toolbarButton: {
        name: 'hourseracing',
        icon: 'icon',
        route: 'products/hourseracing'
      }
    },
    {
      name: 'soccerit',
      label: 'Soccer IT',
      defaultAmount: [1, 2, 5, 10],
      toolbarButton: {
        name: 'soccerit',
        icon: 'icon',
        route: 'products/soccerit'
      }
    }
  ]
};
