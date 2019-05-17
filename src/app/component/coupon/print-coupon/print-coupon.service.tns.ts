import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StagedCoupon, StagedCouponStatus } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { Printer } from 'nativescript-printer';

@Injectable({
  providedIn: 'root'
})
export class PrintCouponService {
  couponPrint: StagedCoupon;
  printer: Printer = new Printer();

  constructor(elysCoupon: ElysCouponService, private router: Router) {
    elysCoupon.stagedCouponObs.subscribe(async coupons => {
      for (const coupon of coupons.filter(
        item => item.CouponStatusId === StagedCouponStatus.Placed
      )) {
        this.couponPrint = coupon;
        this.printWindow();
      }
    });
  }

  printWindow(): void {
    this.router.navigate(['/', { outlets: { print: 'print-coupon' } }]);
  }

  resetPrint(): void {
    this.router.navigate([{ outlets: { print: null } }]);
  }
}
