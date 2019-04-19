import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CouponService } from './coupon.service';
import { Subscription } from 'rxjs';
import { BetCouponOddExtended } from '@elys/elys-coupon/lib/elys-coupon.models';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit, OnDestroy {
  @Input()
  rowHeight: number;
  private maxItems = 5;
  public page = 0;
  public maxPage = 0;
  public listOdds: BetCouponOddExtended[] = [];

  private couponServiceSubscription: Subscription;

  constructor(public couponService: CouponService) {
    this.couponServiceSubscription = this.couponService.couponResponse.subscribe(coupon => {
      this.maxPage = Math.ceil(coupon.Odds.length / this.maxItems);
      this.page = 0;
      this.filterOdds();
    });
  }

  filterOdds() {
    let index = 0;
    const end: number = this.couponService.coupon.Odds.length - (this.page * this.maxItems);
    const start: number = this.couponService.coupon.Odds.length - ((this.page + 1) * this.maxItems);

    this.listOdds = this.couponService.coupon.Odds.filter(() => {
      index++;
      return (index > start && index <= end);
    }).reverse();
    console.log("listOdds", this.listOdds);
  }

  previusOdds() {
    if (this.page <= 0) {
      return;
    }
    this.page--;
    this.filterOdds();
  }

  nextOdds() {
    if (this.page >= this.maxPage - 1) {
      return;
    }
    this.page++;
    this.filterOdds();
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.couponServiceSubscription.unsubscribe();
  }
}
