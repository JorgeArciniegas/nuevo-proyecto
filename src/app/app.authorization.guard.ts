import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterService } from './services/utility/router/router.service';
import { UserService } from './services/user.service';
import { StorageService } from './services/utility/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: RouterService, private userService: UserService, private storageService: StorageService) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      this.userService.targetedUrlBeforeLogin = state.url.toString();
      if (this.userService.isUserLogged) {
        // If the AccountDetails for any reason is not available.
        if (!this.storageService.checkIfExist('UserData')) {
          await this.userService.loadUserData(this.storageService.getData('tokenData'));
        }
        return true;
      } else {
        this.router.getRouter().navigateByUrl('/login');
        return false;
      }
    } catch (err) {
      this.router.getRouter().navigateByUrl(
        this.router.getRouter().createUrlTree(['/error-page'], {
          queryParams: { typeError: '500' }
        })
      );
      return false;
    }
  }
}
