import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { RouterService } from './services/utility/router/router.service';
import { UserService } from './services/user.service';
import { StorageService } from './services/utility/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private router: RouterService,
    private userService: UserService,
    private storageService: StorageService
  ) {}

  async canActivate(
    state: ActivatedRouteSnapshot,
    next: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      // When router path is "login"
      if (state.url[0].path.includes('login')) {
        // The user is already logged
        if (this.userService.isUserLogged) {
          this.router.getRouter().navigateByUrl('/products');
          return false;
        } else {
          return true;
        }
      }
      this.userService.targetedUrlBeforeLogin = next.url.toString();
      // For all the other routes
      if (this.userService.isUserLogged) {
        // If the AccountDetails for any reason is not available.
        if (!this.storageService.checkIfExist('UserData')) {
          await this.userService.loadUserData(
            this.storageService.getData('tokenData')
          );
        }
        return true;
      } else {
        this.router.getRouter().navigateByUrl('/login');
        return false;
      }
    } catch (err) {
      this.router.getRouter().navigateByUrl('/error-page');
      return false;
    }
  }
}
