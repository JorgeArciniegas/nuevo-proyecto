import { Environment, WidgetTypeLink, LAYOUT_RESULT_LIST_TYPE } from './environment.models';

export const environment: Environment = {
  production: false,
  baseApiUrl: 'https://apidemo.vg-services.net',
  pageTitle: 'VDESK-KIOSK',
  theme: 'develop',
  couponDirectPlace: false,
  currencyDefault: 'EUR',
  supportedLang: ['en', 'it', 'es', 'fr', 'pt', 'sq', 'de'],
  defaultAmount: {
    PresetOne: null,
    PresetTwo: null,
    PresetThree: null,
    PresetFour: null
  },
  products:  [
    {
      sportId: 8,
      codeProduct: 'DOG',
      name: 'DogRacing',
      label: 'DOG',
      order: 0,
      productSelected: true,
      isPlayable: true,
      layoutResultList: { // defines the layout type for last results widget
        name: LAYOUT_RESULT_LIST_TYPE.RACING,
        items: 4
      },
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
        }
      ]
    },
    {
      sportId: 10,
      codeProduct: 'HORSE',
      name: 'HorseRacing',
      label: 'HORSE',
      order: 1,
      productSelected: false,
      isPlayable: true,
      layoutResultList: {
        name: LAYOUT_RESULT_LIST_TYPE.RACING,
        items: 4
      },
      toolbarButton: {
        name: 'horseracing',
        icon: 'Horse',
        route: 'products/racing'
      },
      widgets: []
    },
    {
      sportId: 210,
      codeProduct: 'HORSE-VIRT',
      name: 'VirtualHorse',
      label: 'HORSE_VIRTUAL',
      order: 2,
      productSelected: false,
      isPlayable: true,
      layoutResultList: {
        name: LAYOUT_RESULT_LIST_TYPE.RACING,
        items: 4
      },
      toolbarButton: {
        name: 'virtualhorse',
        icon: 'Horse',
        route: 'products/racing'
      },
      widgets: []
    },
    {
      sportId: 1,
      codeProduct: 'ITA-LEAGUE',
      name: 'Soccer',
      label: 'FOOTBALL_ITA',
      order: 3,
      productSelected: false,
      isPlayable: false,
      layoutResultList: {
        name: LAYOUT_RESULT_LIST_TYPE.SOCCER,
        items: 9
      },
      toolbarButton: {
        name: 'Italian League',
        icon: 'Soccer-ita',
        route: 'products/soccer'
      },
      widgets: []
    },
    {
      sportId: 1,
      codeProduct: 'ENG-LEAGUE',
      name: 'Soccer',
      label: 'FOOTBALL_ENG',
      order: 3,
      productSelected: false,
      isPlayable: false,
      layoutResultList: {
        name: LAYOUT_RESULT_LIST_TYPE.SOCCER,
        items: 9
      },
      toolbarButton: {
        name: 'Italian League',
        icon: 'Soccer-eng',
        route: 'products/soccer'
      },
      widgets: []
    }
  ],
  isEnabledReprintCoupon: true,
  showRaceId: true,
  couponMessageTrasmitted: 'Mandate transmitted via the Internet andaccepted on the',
  // tslint:disable-next-line:max-line-length
  couponMessageLegal:
    'Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Utenim ad minim veniam'
};
