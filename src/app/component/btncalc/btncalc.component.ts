import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { Product } from '../../products/models/product.model';
import { PolyfunctionalArea } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { BtncalcService } from './btncalc.service';
import { TypeBetSlipColTot } from '../../products/dogracing/dogracing.models';
import { CouponService } from '../coupon/coupon.service';
import { BtncalcComponentCommon } from './btncalc.component.common';

@Component({
  selector: 'app-btncalc',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent extends BtncalcComponentCommon implements OnInit, OnDestroy {

  @Input()
  rowHeight: number;

  constructor(
    productService: ProductsService,
    btncalcService: BtncalcService,
    appSetting: AppSettings,
    couponService: CouponService
  ) {
    super(productService, btncalcService, appSetting, couponService);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.productNameSelectedSubscribe.unsubscribe();
    this.polyfunctionalValueSubscribe.unsubscribe();
  }
}
