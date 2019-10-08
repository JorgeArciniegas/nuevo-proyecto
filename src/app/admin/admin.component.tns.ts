import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterService } from '../services/utility/router/router.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  isAdminLogged: boolean;
  constructor(private router: RouterService, public userService: UserService) {
    this.isAdminLogged = this.userService.isLoggedOperator();
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
}
