import { Component, OnInit, Input } from '@angular/core';
import { SummaryCoupon, CouponStatus } from '@elys/elys-api';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() data: SummaryCoupon;

  couponStatus: typeof CouponStatus = CouponStatus;

  constructor(public settings: AppSettings) {

  }

  ngOnInit() {
  }

}
