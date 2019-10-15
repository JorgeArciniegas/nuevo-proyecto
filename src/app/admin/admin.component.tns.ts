import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterService } from '../services/utility/router/router.service';
import { WindowSizeService } from '../services/utility/window-size/window-size.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  isAdminLogged: boolean;
  // layout for grid contains rows and button height
  layout: any;

  constructor(private router: RouterService, public userService: UserService, private windowService: WindowSizeService) {
    this.isAdminLogged = this.userService.isLoggedOperator();
    this.layout = this.gridLayoutResponsive();
  }

  goToBetList(): void {
    this.router.getRouter().navigateByUrl('/admin/reports/betsList');
  }

  goToTransactionsList(): void {
    this.router.getRouter().navigateByUrl('/admin/reports/transactionsList');
  }

  goToOperatorSummary(): void {
    this.router.getRouter().navigateByUrl('/admin/reports/operatorSummary');
  }

  goToLanguageSettings(): void {
    this.router.getRouter().navigateByUrl('/admin/settings/languages');
  }

  goToOperators(): void {
    this.router.getRouter().navigateByUrl('/admin/operators');
  }


  goToVboxes(): void {
    this.router.getRouter().navigateByUrl('/admin/vbox');
  }

  goToStatementShop(): void {
    this.router.getRouter().navigateByUrl('/admin/reports/statement-vitual-shop');
  }

  /**
   * find the screen resolution and
   * return the dimension of elements rows and buttons
   *
   */
  gridLayoutResponsive() {
    if (this.windowService.getWindowSize().height < 799) {
      return { rows: '9*,*', buttonHeight: '30' };
    } else {
      return { rows: '9*,*', buttonHeight: '50' };
    }
  }

}
