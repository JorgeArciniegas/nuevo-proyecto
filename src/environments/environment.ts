import { Environment, LICENSE_TYPE } from './environment.models';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Environment = {
  production: false,
  products: [],
  showEventId: false,
  printSettings: {
    isEnabledReprintCoupon: true,
    isTrasmitionInfoMessageShown: true
  },
  couponDirectPlace: false,
  currencyDefault: 'EUR',
  license: LICENSE_TYPE.DEMO_LICENSE,
  bookmakerDetails: ''

};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
