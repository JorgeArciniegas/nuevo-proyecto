import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AppSettings } from '../app.settings';
import { ProductsService } from './products.service';
import { CouponService } from '../component/coupon/coupon.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  observableMediaSubscribe: Subscription;
  public rowHeight: number;
  public settings: AppSettings;
  // amount subscription
  totalStake = 0.00;
  totalStakeSubscribe: Subscription;

  constructor(
    private observableMedia: MediaObserver,
    public service: ProductsService,
    public readonly appSettings: AppSettings,
    private couponService: CouponService
  ) {
    this.settings = appSettings;
    this.observableMediaSubscribe = this.observableMedia.media$.subscribe((change: MediaChange) => {
      this.service.breakpoint = this.service.gridByBreakpoint[change.mqAlias];
      this.service.breakpointSubscribe.next(this.service.breakpoint);
      this.service.fnWindowsSize();
      this.rowHeight = (this.service.windowSize.columnHeight - 30) / 11;
    });

    // amount change
    this.totalStakeSubscribe = couponService.stakeDisplayObs.subscribe( elem => this.totalStake = elem.TotalStake );
  }

  ngOnInit() {

  }
  ngOnDestroy(): void {
    this.observableMediaSubscribe.unsubscribe();
    this.totalStakeSubscribe.unsubscribe();
  }
}
