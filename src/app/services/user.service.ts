import { Injectable } from '@angular/core';
import { AccountDetails, Login } from './api/vgen.model';
import { VgenService } from './api/vgen.service';
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

  constructor(
    private api: VgenService,
    private router: RouterService,
    private storageService: StorageService,
    private translateService: TranslateUtilityService
  ) {}

  /**
   * Method to login and store auth token.
   * @param username username
   * @param password password
   */
  async login(username: string, password: string): Promise<string | undefined> {
    try {
      const response: Login = await this.api.login(username, password);
      const userDataResponse = await this.loadUserData(response.access_token);

      // Check that we have gotten the user data.
      if (this.userDetail) {
        if (this.targetedUrlBeforeLogin) {
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

  logout(): void {
    this.userDetail = undefined;
    // Clear the storage's data and the token from vgen.service
    this.api.removeToken();
    this.storageService.removeItems('tokenData', 'UserData');
    this.router.getRouter().navigateByUrl('/login');
  }

  // Method to retrieve the user data
  async loadUserData(token: string): Promise<string | undefined> {
    try {
      this.setToken(token);
      this.userDetail = await this.api.me();
      // Save the data only if the user is a valid user.
      if (this.isAValidUser()) {
        this.storageService.setData('UserData', this.userDetail);
      } else {
        this.storageService.removeItems('tokenData');
        this.userDetail = undefined;
        return this.translateService.getTranslatedString('USER_NOT_ENABLE_TO_THE_OPERATION');
      }
    } catch (err) {
      return err.error.Message;
    }
  }

  // Method to check if a user is currently logged.
  get isUserLogged(): boolean {
    return this.storageService.checkIfExist('tokenData');
  }

  // Method to set the token on the vgen.service and to save it on the storage as well.
  private setToken(token: string): void {
    this.api.setToken(token);
    this.storageService.setData('tokenData', token);
  }

  // Method to remove the token from the vgen.service and the storage as well.
  private removeToken(): void {
    this.api.removeToken();
    this.storageService.removeItems('tokenData');
  }

  // Method to check if the user can log into the system. Only CTD user are allowed.
  private isAValidUser(): boolean {
    if (
      this.userDetail.UserPolicies.CanCreateEndUserChildren === false &&
      this.userDetail.UserPolicies.CanHaveChildren === false &&
      this.userDetail.UserPolicies.CanHaveCommissions === true &&
      this.userDetail.UserPolicies.CanPlaySportbookLiveByItself === true &&
      this.userDetail.UserPolicies.CanPlaySportbookPrematchByItself === true
    ) {
      return true;
    } else {
      return false;
    }
  }
}
