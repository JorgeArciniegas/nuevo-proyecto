import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { RouterService } from './services/utility/router/router.service';
import { UserService } from './services/user.service';
import { StorageService } from './services/utility/storage/storage.service';
import { TYPE_ACCOUNT } from './services/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: RouterService,
    private userService: UserService,
    private storageService: StorageService
  ) { }

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

  /**
   * Authorization children routes
   * @param childRoute
   * @param state
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let r = false;
    try {
      // check if the route has a restriction
      if (childRoute.data.expectedRole.includes(TYPE_ACCOUNT.OPERATOR) &&
        this.userService.isLoggedOperator()) {
        r = true;
      }
    } catch (err) {
      r = false;
    } finally {

      if (!r) {
        this.router.getRouter().navigateByUrl('/error-page');
      }

      return r;
    }


  }
}
