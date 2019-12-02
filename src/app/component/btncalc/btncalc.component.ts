import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { ProductsService } from '../../products/products.service';
import { CouponService } from '../coupon/coupon.service';
import { BtncalcComponentCommon } from './btncalc.component.common';
import { BtncalcService } from './btncalc.service';
import { UserService } from '../../../../src/app/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-btncalc',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent extends BtncalcComponentCommon
  implements OnInit, OnDestroy {
  @Input()
  rowHeight: number;
  constructor(
    productService: ProductsService,
    btncalcService: BtncalcService,
    public appSetting: AppSettings,
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
  }

  ngOnInit(): void {
    this.btncalcService.initializeSubscriptionAndData();
  }

  ngOnDestroy(): void {
    this.polyfunctionalValueSubscribe.unsubscribe();
    this.CouponoddStakeEditObs.unsubscribe();
    this.couponResponseSubs.unsubscribe();
  }
}
