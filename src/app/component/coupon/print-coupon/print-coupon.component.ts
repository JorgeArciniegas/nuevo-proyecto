import { Component } from '@angular/core';
import { CouponStatus, CouponType } from '@elys/elys-api';
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
  couponType: typeof CouponType = CouponType;
  couponStatus: typeof CouponStatus = CouponStatus;
  constructor(public printCouponService: PrintCouponService, public appSetting: AppSettings, public userService: UserService) {}
}
