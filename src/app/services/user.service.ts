import { Injectable } from '@angular/core';
import { CurrencyCodeRequest, CurrencyCodeResponse, ElysApiService, StagedCouponStatus, TokenDataSuccess, UserType } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { interval } from 'rxjs';
import { AppSettings } from '../app.settings';
import { DataUser, OperatorData } from './user.models';
import { RouterService } from './utility/router/router.service';
import { StorageService } from './utility/storage/storage.service';
import { TranslateUtilityService } from './utility/translate-utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _dataUserDetail: DataUser;

  public get dataUserDetail(): DataUser {
    if (!this._dataUserDetail) {
      this.dataUserDetail = {
        userDetail: null,
        operatorDetail: null
      };
    }
    return this._dataUserDetail;
  }

  public set dataUserDetail(value: DataUser) {
    this._dataUserDetail = value;
  }

  // URL to which was navigating before to be stopped by the authorization guard.
  public targetedUrlBeforeLogin: string;
  public isModalOpen = false;
  public isBtnCalcEditable = true;
  public userCurrency: string;
  private isInitUser = true;
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
          this.loadUserData(this.storageService.getData('tokenData'), this.isLoggedOperator());
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
        if (this.isLoggedOperator()) {
          this.decreasePlayableBalance(coupon.Stake);
        }
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
      if (this.dataUserDetail && this.dataUserDetail.userDetail) {
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
      console.log(err);
      return err.error.error_description;
    }
  }
  /**
   * Different method for user login. It used by authenticate the operator after admin login
   * @param Username
   * @param Password
   */
  async loginOperator(Username: string, Password: string): Promise<string | undefined> {
    try {
      const UserId = this.getOperatorData('ClientId');
      const response: TokenDataSuccess = await this.api.account.clientLoginRequest(
        { Username, Password, UserId }
      );
      const userDataResponse = await this.loadUserData(response.access_token, true);

      // Check that we have gotten the user data.
      if (this.dataUserDetail.operatorDetail) {
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
      console.log(err);
      return err.error && err.error.error_description ? err.error.error_description : err.error;
    }
  }

  logout(): void {
    this.dataUserDetail = undefined;
    // Clear the storage's data and the token from vgen.service
    // this.api.removeToken();
    this.storageService.removeItems('tokenData', 'UserData');
    this.api.tokenBearer = null;
    this.router.getRouter().navigateByUrl('/login');

  }
  /**
   * Decrease the played stake from Playable amount
   * @param stake :number
   */
  decreasePlayableBalance(stake: number): void {
    this.dataUserDetail.userDetail.PlayableBalance -= stake;
  }


  // Method to retrieve the user data
  async loadUserData(token: string, loginOperator?: Boolean): Promise<string | undefined> {
    let isAdmin: boolean;
    try {
      this.setToken(token);
      // check if user is the operator or admin
      if (loginOperator) {
        this.dataUserDetail.operatorDetail = await this.api.account.getOperatorMe();
        isAdmin = false;
      } else if (!this.isAdminExist() || (this.isLoggedOperator() === null || this.isLoggedOperator())) {
        this.dataUserDetail.userDetail = await this.api.account.getMe();
        isAdmin = true;
      } else {
        this.dataUserDetail.operatorDetail = await this.api.account.getOperatorMe();
        isAdmin = false;
      }
      // Save the data only if the user is a valid user.
      if (this.isAValidUser()) {
        if (this.dataUserDetail.userDetail &&
          this.dataUserDetail.userDetail.UserType === UserType.Ced
        ) {

          this.setOperatorData({
            clientId: this.dataUserDetail.userDetail.UserId,
            businessName: this.dataUserDetail.userDetail.FirstName + ' - ' + this.dataUserDetail.userDetail.LastName,
            adminLogged: isAdmin
          }
          );

        } else {
          this.setOperatorData({ adminLogged: isAdmin });
        }

        this.storageService.setData('UserData', this.dataUserDetail);
        try {
          this.userCurrency = this.dataUserDetail.userDetail ?
            this.dataUserDetail.userDetail.Currency :
            this.dataUserDetail.operatorDetail.CurrencyCode;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.storageService.removeItems('tokenData');
        this.dataUserDetail = undefined;
        this.api.tokenBearer = undefined;
        return this.translateService.getTranslatedString(
          'USER_NOT_ENABLE_TO_THE_OPERATION'
        );
      }
      if (this.isInitUser) {
        await this.checkAvailableSportAndSetPresetsAmount();
        this.isInitUser = false;
      }
    } catch (err) {
      if (err.status === 401) {
        // if unauthorized call logout
        this.logout();
      }
      console.log(err);
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
    this.api.tokenBearer = undefined;
  }

  // Method to check if the user can log into the system. Only CTD user are allowed.
  private isAValidUser(): boolean {
    let r: boolean;
    if (this.dataUserDetail.userDetail) { // if the user is admin
      if (
        this.dataUserDetail.userDetail.UserPolicies.CanCreateEndUserChildren === false &&
        this.dataUserDetail.userDetail.UserPolicies.CanHaveChildren === false &&
        this.dataUserDetail.userDetail.UserPolicies.CanHaveCommissions === true &&
        this.dataUserDetail.userDetail.UserPolicies.CanPlayVirtualGenerationsByItself === true) {
        r = true;
      } else {
        r = false;
      }
    } else if (this.dataUserDetail.operatorDetail) { // if the user is operator
      if (
        this.dataUserDetail.operatorDetail.UserPolicies.CanCreateEndUserChildren === false &&
        this.dataUserDetail.operatorDetail.UserPolicies.CanHaveChildren === false &&
        this.dataUserDetail.operatorDetail.UserPolicies.CanHaveCommissions === true &&
        this.dataUserDetail.operatorDetail.UserPolicies.CanPlayVirtualGenerationsByItself === true
      ) {
        r = true;
      } else {
        r = false;
      }
    }
    return r;
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
      currencyCode: this.userCurrency
    };
    return this.api.coupon.getCouponRelatedCurrency(currencyRequest);
  }

  /**
   *
   */
  isAdminExist(): boolean {
    return this.storageService.checkIfExist('operatorData');
  }

  /**
   *
   */
  isLoggedOperator(): boolean {
    return this.getOperatorData('isAdminLogged');
  }
  /**
   *
   * @param key is the parameter to find on the object saved to storage
   */
  getOperatorData(key: string) {
    return this.storageService.getData('operatorData') && this.storageService.getData('operatorData')[key];
  }

  /**
   *
   * @param req
   */
  setOperatorData(req: { clientId?: number, businessName?: string, adminLogged?: boolean }): void {
    const operator: OperatorData = {
      ClientId: req.clientId !== undefined ? req.clientId : this.getOperatorData('ClientId'),
      BusinessName: req.businessName !== undefined ? req.businessName : this.getOperatorData('BusinessName'),
      isAdminLogged: req.adminLogged !== undefined ? req.adminLogged : this.getOperatorData('isAdminLogged')
    };
    this.storageService.setData('operatorData', operator);
  }

  /**
   * Delete admin data from storage
   */
  removeDataCtd() {
    this.storageService.removeItems('operatorData');
  }
}
