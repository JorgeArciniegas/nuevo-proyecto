import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CouponService } from './coupon.service';
import { Subscription } from 'rxjs';
import { BetCouponExtended } from '@elys/elys-coupon/lib/elys-coupon.models';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit, OnDestroy {
  @Input()
  rowHeight: number;

  constructor(public couponService: CouponService) {
  }

  ngOnInit() { }

  ngOnDestroy(): void {
  }
}
