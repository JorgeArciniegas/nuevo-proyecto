import { Injectable } from '@angular/core';
import { StagedCoupon, StagedCouponStatus } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { timer } from 'rxjs';
import { RouterService } from '../../../../../src/app/services/utility/router/router.service';

@Injectable({
  providedIn: 'root'
})
export class PrintCouponService {
  printingEnabled: boolean;
  couponPrint: StagedCoupon;

  constructor(elysCoupon: ElysCouponService, private router: RouterService) {
    elysCoupon.stagedCouponObs.subscribe(async coupons => {
      for (const coupon of coupons.filter(
        item => item.CouponStatusId === StagedCouponStatus.Placed
      )) {
        this.printingEnabled = true;
        this.couponPrint = coupon;
        this.printWindow();
      }
    });
  }

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
        document.getElementById('app').classList.remove('isPrinting');
        this.printingEnabled = false;
        this.couponPrint = null;
        this.router.getRouter().navigate([{ outlets: { print: null } }]);
      });
  }
}
