import { Environment, WidgetTypeLink } from './environment.models';

export const environment: Environment = {
  production: false,
  baseApiUrl: 'https://apidemo.vg-services.net',
  pageTitle: 'VDESK-KIOSK',
  theme: 'develop',
  products: [
    {
      sportId: 8,
      codeProduct: 'DOG',
      name: 'dogracing',
      label: 'DOG',
      defaultAmount: [],
      order: 0,
      productSelected: false,
      isPlayable: true,
      toolbarButton: {
        name: 'dogracing',
        icon: 'Dog',
        route: 'products/racing'
      },
      widgets: [
        {
          name: '',
          routing: '',
          typeLink: WidgetTypeLink.OUTLET,
          icon: ''
        },
      ],
    },
    {
      sportId: 10,
      codeProduct: 'HORSE',
      name: 'horseracing',
      label: 'HORSE',
      defaultAmount: [],
      order: 1,
      productSelected: true,
      isPlayable: true,
      toolbarButton: {
        name: 'horseracing',
        icon: 'Horse',
        route: 'products/racing'
      },
      widgets: [],
    },
    {
      sportId: 210,
      codeProduct: 'HORSE-VIRT',
      name: 'virtualhorse',
      label: 'HORSE_VIRTUAL',
      order: 2,
      productSelected: false,
      isPlayable: true,
      defaultAmount: [],
      toolbarButton: {
        name: 'virtualhorse',
        icon: 'Horse',
        route: 'products/racing'
      },
      widgets: [],
    },
    {
      sportId: 1,
      codeProduct: 'ITA-LEAGUE',
      name: 'Soccer',
      label: 'FOOTBALL_ITA',
      order: 3,
      productSelected: false,
      isPlayable: false,
      defaultAmount: [],
      toolbarButton: {
        name: 'Italian League',
        icon: 'Soccer-ita',
        route: 'products/soccer'
      },
      widgets: [],
    },
    {
      sportId: 1,
      codeProduct: 'ENG-LEAGUE',
      name: 'Soccer',
      label: 'FOOTBALL_ENG',
      order: 3,
      productSelected: false,
      isPlayable: false,
      defaultAmount: [],
      toolbarButton: {
        name: 'Italian League',
        icon: 'Soccer-eng',
        route: 'products/soccer'
      },
      widgets: [],
    },
  ],
  isEnabledReprintCoupon: false,
  showRaceId: true,
  couponMessageTrasmitted: 'Mandate transmitted via the Internet andaccepted on the',
  // tslint:disable-next-line:max-line-length
  couponMessageLegal:
    'Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Utenim ad minim veniam'
};
