import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StagedCoupon, StagedCouponStatus } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { Printer } from 'nativescript-printer';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';


@Injectable({
  providedIn: 'root'
})
export class PrintCouponService {
  couponPrint: StagedCoupon;
  printer: Printer = new Printer();
  view: StackLayout;
  constructor(elysCoupon: ElysCouponService, private router: Router) {
    console.log('i\'m serivce print coupon');
    elysCoupon.stagedCouponObs.subscribe( async (coupons) => {
      for (const coupon of coupons.filter( (item) => item.CouponStatusId === StagedCouponStatus.Placed) ) {
        this.couponPrint = coupon;
        this.printLoadWindow();
      }
    });
  }

  printLoadWindow(): void {
    this.router.navigate(['/', { outlets: { 'print': 'print' }}]);
  }
  printWindow() {}

  resetPrint(): void {
    this.router.navigate([{ outlets: { print: null }}]);
  }


}
