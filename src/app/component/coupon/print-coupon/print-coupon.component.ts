import { Component } from '@angular/core';
import { CouponStatus, CouponType } from '@elys/elys-api';
import { AppSettings } from '../../../app.settings';
import { PrintCouponService } from './print-coupon.service';
import { UserService } from '../../../services/user.service';
import { LICENSE_TYPE } from '../../../../environments/environment.models';
import { TranslateUtilityService } from '../../../services/utility/translate-utility.service';

@Component({
  selector: 'app-print-coupon',
  templateUrl: './print-coupon.component.html',
  styleUrls: ['./print-coupon.component.scss']
})
export class PrintCouponComponent {
  licenseType: typeof LICENSE_TYPE = LICENSE_TYPE;
  couponType: typeof CouponType = CouponType;
  couponStatus: typeof CouponStatus = CouponStatus;
  constructor(
    public printCouponService: PrintCouponService,
    public appSetting: AppSettings,
    public userService: UserService,
    private translateUtilityService: TranslateUtilityService
  ) { }

  getSelectionName(marketName: string, selectionName: string): string {
    if (marketName.toUpperCase().substring(0, marketName.length - 1) === 'RAINBOW') {
      switch (selectionName.substring(0, 1).toLowerCase()) {
        case 'b': return this.translateUtilityService.getTranslatedString('BLUE') + ' ' + selectionName.substring(1);
        case 'r': return this.translateUtilityService.getTranslatedString('RED') + ' ' + selectionName.substring(1);
        case 'g': return this.translateUtilityService.getTranslatedString('GREEN') + ' ' + selectionName.substring(1);
        default:
          break;
      }
    }
    return this.translateUtilityService.getTranslatedString(selectionName.toUpperCase());
  }
}
