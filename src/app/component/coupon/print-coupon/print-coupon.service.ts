import { Injectable } from '@angular/core';
import { StagedCoupon, StagedCouponStatus, SummaryCoupon } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { timer } from 'rxjs';
import { RouterService } from '../../../../../src/app/services/utility/router/router.service';

@Injectable({
  providedIn: 'root'
})
/**
 * PrintCouponService is only for DESKTOP version
 * To not use on NativeScript Application
 */
export class PrintCouponService {
  printingEnabled: boolean;
  couponPrint: StagedCoupon;

  constructor(elysCoupon: ElysCouponService, private router: RouterService) {
    // subscribe to stagedCouponObs and it is found on  "coupon library".
    // It returns the StagedCouponDetail's array
    // Check the status which list is provided in the enum "StagedCouponStatus".
    elysCoupon.stagedCouponObs.subscribe(async coupons => {
      // for results returned filter the item by "CouponStatusId = Placed"  and enable the print
      for (const coupon of coupons.filter(item => item.CouponStatusId === StagedCouponStatus.Placed)) {
        this.printingEnabled = true;
        this.couponPrint = coupon;
        // Start the print process
        this.printWindow();
      }
    });
  }
  reprintCoupon(coupon: SummaryCoupon)  {
    // this.couponPrint = coupon as StagedCoupon;
  }
  /**
   * It Opens the new route on outlet with name=print and append to the Dom element the class "isPrinting"
   * Please do not change it because the style of prints is set on it
   */
  printWindow(): void {
    this.printingEnabled = true;
    this.router
      .getRouter()
      .navigate(['/', { outlets: { print: 'print-coupon' } }]);
    document.getElementById('app').classList.add('isPrinting');
    timer(250)
      .take(1)
      .takeWhile(() => this.printingEnabled)
      .subscribe(valTimer => {
        window.print();
        // delete class
        document.getElementById('app').classList.remove('isPrinting');
        this.printingEnabled = false;
        this.couponPrint = null;
        // reset the router
        this.router.getRouter().navigate([{ outlets: { print: null } }]);
      });
  }
}
