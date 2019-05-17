import { Component, OnInit } from '@angular/core';
import { CouponType } from '@elys/elys-api';
import { PrintCouponService } from './print-coupon.service';
import { AppSettings } from '../../../app.settings';

@Component({
  selector: 'app-print-coupon',
  templateUrl: './print-coupon.component.html',
  styleUrls: ['./print-coupon.component.scss']
})
export class PrintCouponComponent implements OnInit {
  couponType: typeof CouponType = CouponType;
  constructor(public printCouponService: PrintCouponService, public appSetting: AppSettings) {

  }

  ngOnInit() {

  }

}
