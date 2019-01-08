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
        icon: 'Dog',
        route: 'products/dogracing'
      }
    },
    {
      name: 'footballita',
      label: 'Football Ita',
      defaultAmount: [1, 2, 5, 10],
      toolbarButton: {
        name: 'footballita',
        icon: 'Soccer-ita',
        route: 'products/soccerita'
      }
    },
    {
      name: 'footballeng',
      label: 'Football Eng',
      defaultAmount: [1, 2, 5, 10],
      toolbarButton: {
        name: 'footballeng',
        icon: 'Soccer-eng',
        route: 'products/soccereng'
      }
    },
    {
      name: 'roulette',
      label: 'American Roulette',
      defaultAmount: [1, 2, 5, 10],
      toolbarButton: {
        name: 'roulette',
        icon: 'Roulette',
        route: 'products/roulette'
      }
    },
    {
      name: 'horseracing',
      label: 'Horse Racing',
      defaultAmount: [1, 2, 5, 10],
      toolbarButton: {
        name: 'horseracing',
        icon: 'Horse',
        route: 'products/horseracing'
      }
    },
    {
      name: 'cockfight',
      label: 'Cock Fight',
      defaultAmount: [1, 2, 5, 10],
      toolbarButton: {
        name: 'cockfight',
        icon: 'Galli',
        route: 'products/cockfight'
      }
    },
    {
      name: 'keno',
      label: 'keno',
      defaultAmount: [1, 2, 5, 10],
      toolbarButton: {
        name: 'keno',
        icon: 'Bingo',
        route: 'products/keno'
      }
    }
  ]
};
