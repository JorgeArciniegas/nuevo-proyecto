import { Environment, WidgetTypeLink } from './environment.models';

export const environment: Environment = {
  production: false,
  baseApiUrl: 'https://qacom-apidemo.ody-services.net',
  pageTitle: 'VDESK-KIOSK',
  theme: 'develop',
  defaultAmount: {
    PresetOne: null,
    PresetTwo: null,
    PresetThree: null,
    PresetFour: null
  },
  products: [
    {
      sportId: 8,
      codeProduct: 'DOG',
      name: 'DogRacing',
      label: 'DOG',

      order: 0,
      productSelected: true,
      isPlayable: true,
      toolbarButton: {
        name: 'dogracing',
        icon: 'Dog',
        route: 'products/racing'
      },
      widgets: [
        {
          name: '',
          routing: 'statistic',
          typeLink: WidgetTypeLink.MODAL,
          icon: 'baseline-assessment-24px' // without extension file
        },
      ],
    },
    {
      sportId: 10,
      codeProduct: 'HORSE',
      name: 'HorseRacing',
      label: 'HORSE',
      order: 1,
      productSelected: false,
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
      name: 'VirtualHorse',
      label: 'HORSE_VIRTUAL',
      order: 2,
      productSelected: false,
      isPlayable: true,

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

      toolbarButton: {
        name: 'Italian League',
        icon: 'Soccer-eng',
        route: 'products/soccer'
      },
      widgets: [],
    },
  ],
  showRaceId: true,
  isEnabledReprintCoupon:  true,
  couponMessageTrasmitted: 'Mandate transmitted via the Internet andaccepted on the',
  // tslint:disable-next-line:max-line-length
  couponMessageLegal: 'Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Utenim ad minim veniam'
};
