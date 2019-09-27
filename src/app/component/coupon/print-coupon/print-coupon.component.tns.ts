import { Component, ElementRef, ViewChild } from '@angular/core';
import { CouponType, StagedCoupon, CouponStatus } from '@elys/elys-api';
import { Printer } from 'nativescript-printer';
import { AppSettings } from '../../../app.settings';
import { PrintCouponService } from './print-coupon.service';
import { UserService } from '../../../services/user.service';
import { LICENSE_TYPE } from '../../../../environments/environment.models';

@Component({
  selector: 'app-print-coupon',
  templateUrl: './print-coupon.component.html',
  styleUrls: ['./print-coupon.component.scss']
})
export class PrintCouponComponent {
  licenseType: typeof LICENSE_TYPE = LICENSE_TYPE;
  couponPrint: StagedCoupon;
  printer: Printer = new Printer();
  couponStatus: typeof CouponStatus = CouponStatus;
  couponType: typeof CouponType = CouponType;
  @ViewChild('printing', { static: false }) view: ElementRef;
  constructor(public printCouponService: PrintCouponService, public appSetting: AppSettings, public userService: UserService) { }

  print(): void {
    this.printer
      .printScreen({
        view: this.view.nativeElement
      })
      .then(() => this.printCouponService.resetPrint());
  }
}
