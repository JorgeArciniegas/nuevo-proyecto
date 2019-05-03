import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { ProductsService } from '../../products/products.service';
import { CouponService } from '../coupon/coupon.service';
import { BtncalcComponentCommon } from './btncalc.component.common';
import { BtncalcService } from './btncalc.service';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-btncalc',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent extends BtncalcComponentCommon
  implements OnInit, OnDestroy {
  observableMediaSubscribe: Subscription;
  @Input()
  rowHeight: number;
  constructor(
    private observableMedia: MediaObserver,
    productService: ProductsService,
    btncalcService: BtncalcService,
    appSetting: AppSettings,
    couponService: CouponService,
    public service: ProductsService
  ) {
    super(productService, btncalcService, appSetting, couponService);

    this.observableMediaSubscribe = this.observableMedia.media$.subscribe(
      (change: MediaChange) => {
        this.service.breakpoint = this.service.gridByBreakpoint[change.mqAlias];
        this.service.fnWindowsSize();
        this.rowHeight = (this.service.windowSize.columnHeight - 30) / 11;
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.polyfunctionalValueSubscribe.unsubscribe();
    this.CouponoddStakeEditObs.unsubscribe();
    this.couponResponseSubs.unsubscribe();
  }
}
