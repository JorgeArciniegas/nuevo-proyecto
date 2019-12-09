import { Component, Input, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { ProductsService } from '../../products/products.service';
import { CouponService } from '../coupon/coupon.service';
import { IconSize } from '../model/iconSize.model';
import { BtncalcComponentCommon } from './btncalc.component.common';
import { BtncalcService } from './btncalc.service';
import { UserService } from '../../../../src/app/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-btncalc, [app-btncalc]',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent extends BtncalcComponentCommon
  implements OnInit, OnDestroy {
  public amountIcon: IconSize;
  @Input()
  private rowHeight: number;
  @Input()
  public timeBlocked: boolean;

  constructor(
    productService: ProductsService,
    btncalcService: BtncalcService,
    appSetting: AppSettings,
    couponService: CouponService,
    userService: UserService
  ) {
    super(
      productService,
      btncalcService,
      appSetting,
      couponService,
      userService
    );

    this.btncalcService.initializeSubscriptionAndData();
  }

  ngOnInit(): void {

    this.amountIcon = new IconSize(Math.floor(this.rowHeight - 16));
  }

  ngOnDestroy(): void {
    if (this.polyfunctionalValueSubscribe) {

      this.polyfunctionalValueSubscribe.unsubscribe();
    }
  }
}
