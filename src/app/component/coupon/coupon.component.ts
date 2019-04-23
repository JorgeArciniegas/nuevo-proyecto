import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CouponService } from './coupon.service';
import { Subscription } from 'rxjs';
import { BetCouponOddExtended } from '@elys/elys-coupon/lib/elys-coupon.models';
import { AppSettings } from '../../app.settings';
import { BetOdd } from '../../products/products.model';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnDestroy {
  @Input()
  public rowHeight: number;
  private settings: AppSettings;
  public maxItems = 5;
  public page = 0;
  public maxPage = 0;
  public listOdds: BetCouponOddExtended[] = [];

  private couponServiceSubscription: Subscription;

  constructor(
    public couponService: CouponService,
    private readonly appSettings: AppSettings
  ) {
    this.settings = this.appSettings;
    this.couponServiceSubscription = this.couponService.couponResponse.subscribe(coupon => {
      this.maxPage = Math.ceil(coupon.Odds.length / this.maxItems);
      this.page = 0;
      this.filterOdds();
    });
  }

  filterOdds(): void {
    let index = 0;
    const end: number = this.couponService.coupon.Odds.length - (this.page * this.maxItems);
    const start: number = this.couponService.coupon.Odds.length - ((this.page + 1) * this.maxItems);

    this.listOdds = this.couponService.coupon.Odds.filter(() => {
      index++;
      return (index > start && index <= end);
    }).reverse();
  }

  previusOdds(): void {
    if (this.page <= 0) {
      return;
    }
    this.page--;
    this.filterOdds();
  }

  nextOdds(): void {
    if (this.page >= this.maxPage - 1) {
      return;
    }
    this.page++;
    this.filterOdds();
  }

  removeOdd(odd: BetCouponOddExtended): void {
    this.couponService.addRemoveToCoupon([new BetOdd(odd.SelectionName, odd.OddValue, odd.OddStake, odd.SelectionId)]);
  }

  ngOnDestroy(): void {
    this.couponServiceSubscription.unsubscribe();
  }
}
