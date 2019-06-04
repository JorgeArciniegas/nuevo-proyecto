import { Component, ElementRef, ViewChild } from '@angular/core';
import { CouponType, StagedCoupon } from '@elys/elys-api';
import { Printer } from 'nativescript-printer';
import { AppSettings } from '../../../app.settings';
import { PrintCouponService } from './print-coupon.service';

@Component({
  selector: 'app-print-coupon',
  templateUrl: './print-coupon.component.html',
  styleUrls: ['./print-coupon.component.scss']
})
export class PrintCouponComponent {
  couponPrint: StagedCoupon;
  printer: Printer = new Printer();

  couponType: typeof CouponType = CouponType;
  @ViewChild('printing') view: ElementRef;
  constructor(public printCouponService: PrintCouponService, public appSetting: AppSettings) {
  }

  print(): void {
    this.printer
      .printScreen({
        view: this.view.nativeElement
      })
      .then(() => this.printCouponService.resetPrint());
  }
}
