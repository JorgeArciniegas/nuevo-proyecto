import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { VgenService } from './api/vgen.service';
import { AccountDetails, Login } from './api/vgen.model';
import { StorageService } from './utility/storage/storage.service';
import { RouterService } from './utility/router/router.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userDetail: AccountDetails;
  // URL to which was navigating before to be stopped by the authorization guard.
  public targetedUrlBeforeLogin: string;

  constructor(private api: VgenService, private router: RouterService, private storageService: StorageService) {}

  /**
   * Method to login and store auth token.
   * @param username username
   * @param password password
   */
  async login(username: string, password: string): Promise<void> {
    try {
      const response: Login = await this.api.login(username, password);
      this.storageService.setData('tokenData', response.access_token);
      await this.loadUserData();

      if (this.targetedUrlBeforeLogin) {
        this.router.getRouter().navigateByUrl(this.targetedUrlBeforeLogin);
      } else {
        this.router.getRouter().navigateByUrl('/products');
      }
    } catch (err) {
      // IMPLEMENTARE RITORNO ERRORE
      // this.messageService.showMessage(result.replace(/\./g, '|'), 'snackbar-error');
    }
  }

  logout(): void {
    this.userDetail = undefined;
    // Clear the data in the storage
    this.storageService.destroy();
    this.router.getRouter().navigateByUrl('/login');
  }

  // Method to retrieve the user data
  async loadUserData(): Promise<void> {
    try {
      this.userDetail = await this.api.me();
      this.storageService.setData('UserData', this.userDetail);
    } catch (err) {}
  }

  // Method to check if a user is currently logged.
  get isUserLogged(): boolean {
    return this.storageService.checkIfExist('tokenData');
  }

  // Retrieve the current token.
  public getCurrentToken(): string {
    return this.storageService.getData('tokenData');
  }
}
