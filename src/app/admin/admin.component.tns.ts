import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  isAdminLogged: boolean;
  constructor(private router: RouterExtensions, public userService: UserService) {
    this.isAdminLogged = this.userService.isLoggedOperator();
  }

  goToBetList(): void {
    this.router.navigateByUrl('/admin/reports/betsList');
  }

  goToTransactionsList(): void {
    this.router.navigateByUrl('/admin/reports/transactionsList');
  }

  goToOperatorSummary(): void {
    this.router.navigateByUrl('/admin/reports/operatorSummary');
  }

  goToLanguageSettings(): void {
    this.router.navigateByUrl('/admin/settings/languages');
  }

  goToOperators(): void {
    this.router.navigateByUrl('/admin/operators');
  }


  goToVboxes(): void {
    this.router.navigateByUrl('/admin/vbox');
  }

  goToStatementShop(): void {
    this.router.navigateByUrl('/admin/reports/statement-vitual-shop');
  }
}
