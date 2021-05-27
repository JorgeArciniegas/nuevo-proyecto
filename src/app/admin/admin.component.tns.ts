import { Component, AfterContentInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterService } from '../services/utility/router/router.service';
import { WindowSizeService } from '../services/utility/window-size/window-size.service';
import { LoaderService } from '../services/utility/loader/loader.service';
import { timer } from 'rxjs';
import { AppSettings } from '../app.settings';

@Component({
  selector: 'app-admin, [app-admin]',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterContentInit {
  isAdminLogged: boolean;
  // layout for grid contains rows and button height
  layout: any;
  constructor(
    private router: RouterService,
    public userService: UserService,
    private windowService: WindowSizeService,
    private loaderService: LoaderService,
    public appSettings: AppSettings
  ) {
    this.isAdminLogged = this.userService.isLoggedOperator();
    this.layout = this.gridLayoutResponsive();
  }

  tapNewRouting() {
    this.loaderService.setLoading(true, 'ChildrenAdmin');
  }

  ngAfterContentInit() {
    timer(300).subscribe(() =>
      this.loaderService.setLoading(false, 'AdminPanel')
    );
  }


  goToBetList(): void {
    this.tapNewRouting();
    timer(100).subscribe(() => this.router.getRouter().navigateByUrl('/admin/reports/betsList'));
  }

  goToTransactionsList(): void {
    this.tapNewRouting();
    timer(100).subscribe(() => this.router.getRouter().navigateByUrl('/admin/reports/transactionsList'));
  }

  goToOperatorSummary(): void {
    this.tapNewRouting();
    timer(100).subscribe(() => this.router.getRouter().navigateByUrl('/admin/reports/operatorSummary'));
  }

  goToLanguageSettings(): void {
    this.tapNewRouting();
    timer(100).subscribe(() => this.router.getRouter().navigateByUrl('/admin/settings/languages'));
  }

  goToOperators(): void {
    this.tapNewRouting();
    timer(100).subscribe(() => this.router.getRouter().navigateByUrl('/admin/operators'));
  }


  goToVboxes(): void {
    this.tapNewRouting();
    timer(100).subscribe(() => this.router.getRouter().navigateByUrl('/admin/vbox'));
  }

  goToStatementShop(): void {
    this.tapNewRouting();
    timer(100).subscribe(() => this.router.getRouter().navigateByUrl('/admin/reports/statement-vitual-shop'));
  }


  /**
   * find the screen resolution and
   * return the dimension of elements rows and buttons
   *
   */
  gridLayoutResponsive() {
    if (this.windowService.windowSize.height < 799) {
      return { rows: '9*,*', buttonHeight: '30' };
    } else {
      return { rows: '9*,*', buttonHeight: '50' };
    }
  }

}
