import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../../products/products.service';
import { IconSize } from '../../model/iconSize.model';
import { UserService } from '../../../services/user.service';
import { ElysCouponService } from '@elys/elys-coupon';
import { StagedCouponStatus } from '@elys/elys-api';
import { StorageService } from '../../../services/utility/storage/storage.service';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public settings: AppSettings;
  public myTime: Date = new Date();
  public notifyIcon: IconSize;
  public barHeight: number;

  constructor(
    public readonly appSettings: AppSettings,
    public productService: ProductsService,
    public userService: UserService,
    private storageService: StorageService,
    private elysCouponService: ElysCouponService
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
    interval(1000).subscribe(() => this.getTime());
    this.barHeight =
      this.productService.windowSize.height -
      this.productService.windowSize.columnHeight;
    this.notifyIcon = new IconSize(this.barHeight * 0.5);
  }

  getTime(): void {
    this.myTime = new Date();
  }
}
