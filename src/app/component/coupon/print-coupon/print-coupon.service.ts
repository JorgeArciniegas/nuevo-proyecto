import { Injectable } from '@angular/core';
import { ElysCouponService } from '@elys/elys-coupon';
import { async } from '@angular/core/testing';
import { CouponStatus, StagedCouponStatus, StagedCoupon } from '@elys/elys-api';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintCouponService {

  printingEnabled: boolean;
  couponPrint: StagedCoupon;

  constructor(elysCoupon: ElysCouponService, private router: Router) {
    elysCoupon.stagedCouponObs.subscribe( async (coupons) => {
      for (const coupon of coupons.filter( (item) => item.CouponStatusId === StagedCouponStatus.Placed) ) {
        this.printingEnabled = true;
        this.couponPrint = coupon;
        this.printWindow();
      }
    });
  }

  printWindow(): void {
    this.printingEnabled = true;
    this.router.navigate(['/', { outlets: { 'print': 'print' }}]);
    document.getElementById('app').classList.add('isPrinting');
    timer(250)
      .take(1)
      .takeWhile( () => this.printingEnabled )
      .subscribe( valTimer => {
        window.print();
        document.getElementById('app').classList.remove('isPrinting');
        this.printingEnabled = false;
        this.couponPrint  = null;
        this.router.navigate([{ outlets: { print: null }}]);
      });

  }

}
