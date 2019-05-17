import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { AppSettings } from '../../../../app.settings';
import { CouponStatusInternal, CouponTypeInternal } from '../bets-list.model';
import { BetsListService } from '../bets-list.service';

@Component({
  selector: 'app-summary-coupons',
  templateUrl: './summary-coupons.component.html',
  styleUrls: ['./summary-coupons.component.scss']
})
export class SummaryCouponsComponent {

  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;

  constructor(
    public readonly settings: AppSettings,
    public betsListService: BetsListService,
    private router: RouterExtensions
  ) { }

  goBack(): void {
    this.router.back();
  }
}
