import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { BetsListService } from '../bets-list.service';
import { CouponTypeInternal, CouponStatusInternal } from '../bets-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-coupons',
  templateUrl: './summary-coupons.component.html',
  styleUrls: ['./summary-coupons.component.scss']
})
export class SummaryCouponsComponent implements OnInit {

  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;

  constructor(public readonly settings: AppSettings, public betsListService: BetsListService) {

  }

  ngOnInit() {

  }


}
