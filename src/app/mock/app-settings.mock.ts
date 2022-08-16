import { CouponPresetValues } from "@elys/elys-api";
import { LICENSE_TYPE, PrintSettings, Products } from "src/environments/environment.models";

export class AppSettingsStub {
  baseApiUrl: string = "https://vg-apidemo.odissea-services.net";
  bookmakerDetails: string = 'environment.bookmakerDetails';
  license: LICENSE_TYPE = 0;
  production: boolean = false;
  staging: boolean = true;
  pageTitle: string = "VDESK-KIOSK";
  theme: string = "develop";
  faviconPath: string = "app/themes/skins/develop/image/Logo-header.png";
  supportedLang: string[] = ['en', 'it', 'es', 'fr', 'pt', 'sq', 'de', 'ht'];
  products: Products[] = [{
    codeProduct: "DOG",
    isPlayable: true,
    label: "DOG",
    layoutProducts: {type: 0, resultItems: 4, nextEventItems: 5, cacheEventsItem: 10, multiFeedType: 'F2'},
    name: "DogRacing",
    order: 0,
    productSelected: true,
    sportId: 8,
    toolbarButton: {name: 'dogracing', icon: 'Dog', route: 'products/racing'},
    typeCoupon: {isMultipleStake: true, acceptMultiStake: true, typeLayout: 0},
    widgets: [
      {name: '', routing: 'statistic', typeLink: 0, icon: 'baseline-assessment-24px'}
    ]
  }];
  printSettings: PrintSettings = {
    enabledPrintCoupon: {
      hideMaxPaymentAmount: false,
      isEnabledReprintCoupon: true,
      isTrasmitionInfoMessageShown: false,
      printHeaderMessage: false,
      printLogoCoupon: true,
      printQrCode: false
    },
    enabledPrintReceipt: {printLogoPayCancel: true, printHeaderMessage: false}
  };
  showEventId: boolean = true;
  defaultAmount: CouponPresetValues = {PresetOne: 1, PresetTwo: 2, PresetThree: 3, PresetFour: 5};
  couponDirectPlace: boolean = true;
  currencyDefault: string = "USD";
  loginInteractive: boolean = true;
}
