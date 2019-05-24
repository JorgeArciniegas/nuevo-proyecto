import { Injectable } from '@angular/core';
import { StagedCoupon, StagedCouponStatus } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { Printer } from 'nativescript-printer';
import { RouterService } from '../../../../../src/app/services/utility/router/router.service';

@Injectable({
  providedIn: 'root'
})
export class PrintCouponService {
  couponPrint: StagedCoupon;
  printer: Printer = new Printer();

  constructor(elysCoupon: ElysCouponService, private router: RouterService) {
    // subscribe to stagedCouponObs and it is found on  "coupon library".
    // It return the StagedCouponDetail's array
    // Please check the status it can have on ENUM StagedCouponStatus
    elysCoupon.stagedCouponObs.subscribe(async coupons => {
      // for results returned filter the item by "CouponStatusId = Placed"  and enable the print
      for (const coupon of coupons.filter(
        item => item.CouponStatusId === StagedCouponStatus.Placed
      )) {
        this.couponPrint = coupon;
        // Start the print process
        this.printWindow();
      }
    });
  }

  printWindow(): void {
    this.router.getRouter().navigate(['/', { outlets: { print: 'print-coupon' } }]);
  }

  resetPrint(): void {
    this.router.getRouter().navigate([{ outlets: { print: null } }]);
  }
}
