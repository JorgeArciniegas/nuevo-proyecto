import {
  Environment,
  WidgetTypeLink,
  LAYOUT_TYPE,
  LICENSE_TYPE
} from './environment.models';
import { Market } from '../app/products/products.model';

export const environment: Environment = {
  production: false,
  // tslint:disable-next-line:max-line-length
  bookmakerDetails:
    'Lorem ipsum dolor sit amet,consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore etdolore magna aliqua.',
  license: LICENSE_TYPE.DEMO_LICENSE,
  baseApiUrl: 'https://apidemo.vg-services.net',
  pageTitle: 'VDESK-KIOSK',
  theme: 'develop',
  faviconPath: 'app/themes/skins/develop/image/Logo-header.png',
  couponDirectPlace: true,
  currencyDefault: 'EUR',
  supportedLang: ['en', 'it', 'es', 'fr', 'pt', 'sq', 'de'],
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
      layoutProducts: {
        // defines the layout type for different product group
        type: LAYOUT_TYPE.RACING,
        resultItems: 4, // items to show for last result
        nextEventItems: 5, // items to show for next events
        cacheEventsItem: 10
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
      ],
      typeCoupon: {
        isMultipleStake: true,
        acceptMultiStake: true,
        typeLayout: LAYOUT_TYPE.COCK_FIGHT
      }
    },
    {
      sportId: 10,
      codeProduct: 'HORSE',
      name: 'HorseRacing',
      label: 'HORSE',
      order: 1,
      productSelected: false,
      isPlayable: true,
      layoutProducts: {
        type: LAYOUT_TYPE.RACING,
        resultItems: 4,
        nextEventItems: 5,
        cacheEventsItem: 10
      },
      toolbarButton: {
        name: 'horseracing',
        icon: 'Horse',
        route: 'products/racing'
      },
      widgets: [
        {
          name: '',
          routing: 'statistic',
          typeLink: WidgetTypeLink.MODAL,
          icon: 'baseline-assessment-24px' // without extension file
        }
      ],
      typeCoupon: {
        isMultipleStake: true,
        acceptMultiStake: true,
        typeLayout: LAYOUT_TYPE.COCK_FIGHT
      }
    },
    {
      sportId: 210,
      codeProduct: 'HORSE-VIRT',
      name: 'VirtualHorse',
      label: 'HORSE_VIRTUAL',
      order: 2,
      productSelected: false,
      isPlayable: true,
      layoutProducts: {
        type: LAYOUT_TYPE.RACING,
        resultItems: 4,
        nextEventItems: 5,
        cacheEventsItem: 10
      },
      toolbarButton: {
        name: 'virtualhorse',
        icon: 'Horse',
        route: 'products/racing'
      },
      widgets: [
        {
          name: '',
          routing: 'statistic',
          typeLink: WidgetTypeLink.MODAL,
          icon: 'baseline-assessment-24px' // without extension file
        }
      ],
      typeCoupon: {
        isMultipleStake: true,
        acceptMultiStake: true,
        typeLayout: LAYOUT_TYPE.COCK_FIGHT
      }
    },
    {
      sportId: 1,
      codeProduct: 'ITA-LEAGUE',
      name: 'Soccer',
      label: 'FOOTBALL_ITA',
      order: 4,
      productSelected: false,
      isPlayable: true,
      layoutProducts: {
        type: LAYOUT_TYPE.SOCCER,
        resultItems: 10,
        nextEventItems: 2,
        cacheEventsItem: 2
      },
      toolbarButton: {
        name: 'Italian League',
        icon: 'Soccer-ita',
        route: 'products/soccer'
      },
      widgets: [
        {
          name: '',
          routing: 'ranking',
          typeLink: WidgetTypeLink.MODAL,
          icon: 'ranking-cup' // without extension file
        },
        {
          name: '',
          routing: 'statistic',
          typeLink: WidgetTypeLink.MODAL,
          icon: 'baseline-assessment-24px' // without extension file
        }
      ],
      typeCoupon: {
        isMultipleStake: false,
        acceptMultiStake: false,
        typeLayout: LAYOUT_TYPE.SOCCER
      }
    },
    {
      sportId: 1,
      codeProduct: 'ENG-LEAGUE',
      name: 'Soccer',
      label: 'FOOTBALL_ENG',
      order: 5,
      productSelected: false,
      isPlayable: true,
      layoutProducts: {
        type: LAYOUT_TYPE.SOCCER,
        resultItems: 10,
        nextEventItems: 2,
        cacheEventsItem: 2
      },
      toolbarButton: {
        name: 'Italian League',
        icon: 'Soccer-eng',
        route: 'products/soccer'
      },
      widgets: [
        {
          name: '',
          routing: 'ranking',
          typeLink: WidgetTypeLink.MODAL,
          icon: 'ranking-cup' // without extension file
        },
        {
          name: '',
          routing: 'statistic',
          typeLink: WidgetTypeLink.MODAL,
          icon: 'baseline-assessment-24px' // without extension file
        }
      ],
      typeCoupon: {
        isMultipleStake: false,
        acceptMultiStake: false,
        typeLayout: LAYOUT_TYPE.SOCCER
      }
    },
    {
      sportId: 20,
      codeProduct: 'COCK',
      name: 'CockFight',
      label: 'COCK_FIGHT',
      order: 3,
      productSelected: false,
      isPlayable: true,
      layoutProducts: {
        // defines the layout type for last results widget
        type: LAYOUT_TYPE.COCK_FIGHT,
        resultItems: 4,
        nextEventItems: 5,
        shownMarkets: [
          Market['1X2'],
          Market['1X2OverUnder'],
          Market['1X2WinningSector'],
          Market['WinningSector'],
          Market['OverUnder']
        ],
        cacheEventsItem: 10
      },
      toolbarButton: {
        name: 'cockfight',
        icon: 'Cocks',
        route: 'products/cock-fight'
      },
      widgets: [
        {
          name: '',
          routing: 'statistic',
          typeLink: WidgetTypeLink.MODAL,
          icon: 'baseline-assessment-24px' // without extension file
        }
      ],
      typeCoupon: {
        isMultipleStake: true,
        acceptMultiStake: true,
        typeLayout: LAYOUT_TYPE.COCK_FIGHT
      }
    }
  ],
  showEventId: true,
  printSettings: {
    isEnabledReprintCoupon: true,
    isTrasmitionInfoMessageShown: true,
    isShowHeaderMessage: true
  }
};
