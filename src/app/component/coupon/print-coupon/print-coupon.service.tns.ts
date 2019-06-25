import { Injectable } from '@angular/core';
import { StagedCoupon, StagedCouponStatus } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { Printer } from 'nativescript-printer';
import { RouterService } from '../../../../../src/app/services/utility/router/router.service';
import { SummaryCoupon } from '@elys/elys-api/lib/reports/reports.models';

@Injectable({
  providedIn: 'root'
})
export class PrintCouponService {
  couponPrint: StagedCoupon;
  printer: Printer = new Printer();

  isPrintAgainst: boolean;
  reprintDate: Date;
  constructor(elysCoupon: ElysCouponService, private router: RouterService) {
    // Subscribe to the "stageCouponObs". This observable is provided by the Elys-Coupon library.
    // It returns the StagedCouponDetail's array
    // Check the status which list is provided in the enum "StagedCouponStatus".
    elysCoupon.stagedCouponObs.subscribe(async coupons => {
      // for results returned filter the item by "CouponStatusId = Placed"  and enable the print
      for (const coupon of coupons.filter(item => item.CouponStatusId === StagedCouponStatus.Placed)) {
        this.couponPrint = coupon;
        // Start the print process
        this.printWindow();
      }
    });
  }

  reprintCoupon(coupon: SummaryCoupon) {
    this.couponPrint = (coupon as unknown) as StagedCoupon;
    this.isPrintAgainst = true;
    this.reprintDate = new Date();
    this.printWindow();
  }

  printWindow(): void {
    this.router.getRouter().navigate(['/', { outlets: { print: 'print-coupon' } }]);
  }

  resetPrint(): void {
    this.router.getRouter().navigate([{ outlets: { print: null } }]);
    this.isPrintAgainst = false;
  }
}
