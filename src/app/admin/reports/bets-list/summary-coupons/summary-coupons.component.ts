import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { BetsListService } from '../bets-list.service';
import { CouponTypeInternal, CouponStatusInternal } from '../bets-list.model';

@Component({
  selector: 'app-summary-coupons',
  templateUrl: './summary-coupons.component.html',
  styleUrls: ['./summary-coupons.component.scss']
})
export class SummaryCouponsComponent implements OnInit {

  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;

  public page = 0;
  public maxPage = 0;

  constructor(public readonly settings: AppSettings, public betsListService: BetsListService) { }

  ngOnInit() {
  }

}
