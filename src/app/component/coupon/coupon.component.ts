import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CouponService } from './coupon.service';
import { Subscription } from 'rxjs';
import { BetCouponExtended, BetCouponOddExtended } from '@elys/elys-coupon/lib/elys-coupon.models';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit, OnDestroy {
  @Input()
  rowHeight: number;

  lastCouponOdds: BetCouponOddExtended[] = [];

  constructor(public couponService: CouponService) {
    this.couponService.couponResponse.subscribe(coupon => {
      this.lastCouponOdds = coupon.Odds.slice(-5);
      const couponLength = coupon.Odds.length;
      for (let index = this.lastCouponOdds.length - 1; index >= 0; index--) {
        this.lastCouponOdds[index].internal_Sequence = couponLength - index;
      }
    });
  }

  ngOnInit() { }

  ngOnDestroy(): void {
  }
}
