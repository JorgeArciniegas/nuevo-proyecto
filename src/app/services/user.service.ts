import { Injectable } from '@angular/core';
import {
  AccountDetails,
  CurrencyCodeRequest,
  CurrencyCodeResponse,
  ElysApiService,
  StagedCouponStatus,
  TokenDataSuccess
} from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { interval } from 'rxjs';
import { AppSettings } from '../app.settings';
import { RouterService } from './utility/router/router.service';
import { StorageService } from './utility/storage/storage.service';
import { TranslateUtilityService } from './utility/translate-utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userDetail: AccountDetails;
  // URL to which was navigating before to be stopped by the authorization guard.
  public targetedUrlBeforeLogin: string;
  public isModalOpen = false;
  public userCurrency: string;
  constructor(
    private router: RouterService,
    private storageService: StorageService,
    private translateService: TranslateUtilityService,
    private api: ElysApiService,
    private appSetting: AppSettings,
    private elysCouponService: ElysCouponService
  ) {
    this.userCurrency = appSetting.currencyDefault;
    // Check if the user is logged
    if (this.isUserLogged) {
      interval(300000).subscribe(() => {
        if (this.isUserLogged) {
          this.loadUserData(this.storageService.getData('tokenData'));
        }
      });
      this.loadUserData(this.storageService.getData('tokenData'));
    }
    /**
     * listening for staged coupons variation then check the status, if = Placed substracts the played stake from playable balance
     */
    this.elysCouponService.stagedCouponObs.subscribe(coupons => {
      for (const coupon of coupons.filter(
        item => item.CouponStatusId === StagedCouponStatus.Placed
      )) {
        this.decreasePlayableBalance(coupon.Stake);
      }
    });
  }
  /**
   * Method to login and store auth token.
   * @param username username
   * @param password password
   */
  async login(username: string, password: string): Promise<string | undefined> {
    try {
      const response: TokenDataSuccess = await this.api.account.postAccessToken(
        { username, password }
      );
      const userDataResponse = await this.loadUserData(response.access_token);

      // Check that we have gotten the user data.
      if (this.userDetail) {
        /* If there is a previous Url which is different then the admin area.
          To avoid to go back to the menu where the user had gone just to do the "logout" or to the lists that wouldn't miss the data. */
        if (
          this.targetedUrlBeforeLogin &&
          !this.targetedUrlBeforeLogin.includes('/admin')
        ) {
          this.router.getRouter().navigateByUrl(this.targetedUrlBeforeLogin);
        } else {
          this.router.getRouter().navigateByUrl('/products');
        }
      } else {
        return userDataResponse;
      }
    } catch (err) {
      return err.error.error_description;
    }
  }

  logout(): void {
    this.userDetail = undefined;
    // Clear the storage's data and the token from vgen.service
    // this.api.removeToken();
    this.storageService.removeItems('tokenData', 'UserData');
    this.router.getRouter().navigateByUrl('/login');
  }
  /**
   * Decrease the played stake from Playable amount
   * @param stake :number
   */
  decreasePlayableBalance(stake: number): void {
    this.userDetail.PlayableBalance -= stake;
  }
  // Method to retrieve the user data
  async loadUserData(token: string): Promise<string | undefined> {
    try {
      this.setToken(token);
      this.userDetail = await this.api.account.getMe();
      // Save the data only if the user is a valid user.
      if (this.isAValidUser()) {
        this.storageService.setData('UserData', this.userDetail);
        try {
          this.userCurrency = this.userDetail.Currency;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.storageService.removeItems('tokenData');
        this.userDetail = undefined;
        return this.translateService.getTranslatedString(
          'USER_NOT_ENABLE_TO_THE_OPERATION'
        );
      }
      await this.checkAvailableSportAndSetPresetsAmount();
    } catch (err) {
      if (err.status === 401) {
        // if unauthorized call logout
        this.logout();
      }
      return err.error.Message;
    }
  }

  // Method to check if a user is currently logged.
  get isUserLogged(): boolean {
    return this.storageService.checkIfExist('tokenData');
  }

  // Method to set the token on the vgen.service and to save it on the storage as well.
  private setToken(token: string): void {
    // Put on API LIB the token bearer
    this.api.tokenBearer = token;
    this.storageService.setData('tokenData', token);
  }

  // Method to remove the token from the vgen.service and the storage as well.
  private removeToken(): void {
    this.api.tokenBearer = null;
    this.storageService.removeItems('tokenData');
  }

  // Method to check if the user can log into the system. Only CTD user are allowed.
  private isAValidUser(): boolean {
    if (
      this.userDetail.UserPolicies.CanCreateEndUserChildren === false &&
      this.userDetail.UserPolicies.CanHaveChildren === false &&
      this.userDetail.UserPolicies.CanHaveCommissions === true &&
      this.userDetail.UserPolicies.CanPlayVirtualGenerationsByItself === true
    ) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Setting the real playble game
   * It sets 'defaultAmount' on products from 'CouponPresetValues'.
   * If the game is present on the 'environment' but it doesn't match the 'availableSport',
   * it isn't playable and it is only shown in the reports list.
   */
  async checkAvailableSportAndSetPresetsAmount(): Promise<void> {
    // Set  'defaultAmount'  the "presets value"
    this.getDefaultPreset().then(preset => {
      this.appSetting.defaultAmount = preset.CouponPreset.CouponPresetValues;
    });
    // match products result from api to products on the system
    this.api.virtual.getAvailablevirtualsports().then(items => {
      this.appSetting.products.map(prod => {
        items.filter(i => i.SportId === prod.sportId);
      });
    });
    // Order the result from minor to major
    this.appSetting.products.sort((a, b) => (a.order <= b.order ? -1 : 1));
  }

  //
  getDefaultPreset(): Promise<CurrencyCodeResponse> {
    const currencyRequest: CurrencyCodeRequest = {
      currencyCode: this.storageService.getData('UserData').Currency
    };
    return this.api.coupon.getCouponRelatedCurrency(currencyRequest);
  }
}
