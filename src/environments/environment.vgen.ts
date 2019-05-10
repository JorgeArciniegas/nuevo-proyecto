import { Environment } from './environment.models';

export const environment: Environment = {
  production: false,
  baseApiUrl: 'https://qacom-apidemo.ody-services.net',
  pageTitle: 'VDESK-KIOSK',
  theme: 'develop',
  products: [
    {
      name: 'dogracing',
      label: 'Dog Racing',
      defaultAmount: [],
      toolbarButton: {
        name: 'dogracing',
        icon: 'Dog',
        route: 'products/dogracing'
      }
    },
    {
      name: 'footballita',
      label: 'Football Ita',
      defaultAmount: [],
      toolbarButton: {
        name: 'footballita',
        icon: 'Soccer-ita',
        route: 'products/soccerita'
      }
    },
    {
      name: 'footballeng',
      label: 'Football Eng',
      defaultAmount: [],
      toolbarButton: {
        name: 'footballeng',
        icon: 'Soccer-eng',
        route: 'products/soccereng'
      }
    },
    {
      name: 'roulette',
      label: 'American Roulette',
      defaultAmount: [],
      toolbarButton: {
        name: 'roulette',
        icon: 'Roulette',
        route: 'products/roulette'
      }
    },
    {
      name: 'horseracing',
      label: 'Horse Racing',
      defaultAmount: [],
      toolbarButton: {
        name: 'horseracing',
        icon: 'Horse',
        route: 'products/horseracing'
      }
    },
    {
      name: 'cockfight',
      label: 'Cock Fight',
      defaultAmount: [],
      toolbarButton: {
        name: 'cockfight',
        icon: 'Galli',
        route: 'products/cockfight'
      }
    },
    {
      name: 'keno',
      label: 'keno',
      defaultAmount: [],
      toolbarButton: {
        name: 'keno',
        icon: 'Bingo',
        route: 'products/keno'
      }
    }
  ],
  showRaceId: true,
  couponMessageTrasmitted: 'Mandate transmitted via the Internet andaccepted on the',
  // tslint:disable-next-line:max-line-length
  couponMessageLegal:
    'Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Utenim ad minim veniam'
};
