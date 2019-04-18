import { Injectable } from '@angular/core';
import { BetCoupon, ElysApiService, CouponCategory } from '@elys/elys-api';
import { BetOdd } from 'src/app/products/products.model';
import { ElysCouponService } from '@elys/elys-coupon';
import { AddOddRequest, BetCouponExtended } from '@elys/elys-coupon/lib/elys-coupon.models';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  // coupon cache
  coupon: BetCouponExtended = null;
  couponIdAdded: number[] = [];
  subscriptionCoupon: Subscription;
  constructor(public elyscoupon: ElysCouponService, userService: UserService) {
    this.elyscoupon.couponConfig.userId = userService.userDetail ? userService.userDetail.UserId : undefined;
    this.subscriptionCoupon = elyscoupon.couponHasChanged.subscribe( coupon => {
        this.coupon = coupon;
      } );

      elyscoupon.couponConfig.betCoupon = this.coupon;
   }

   addRemoveToCoupon(smart: BetOdd[]): void {
    console.log(smart);
    try {
      if (smart) {
        for ( const bet of smart.filter(item => item.selected) ) {
          let addBoolean = true;
          this.couponIdAdded.filter( (item, idx) => {
            if (item === bet.id) {
              addBoolean = false;
              this.couponIdAdded.slice(idx);
            }
          });
          this.elyscoupon.manageOdd(this.requestObj(bet, addBoolean));
        }
      }
    } catch (e) {
      console.log('err', e);
    }
  }

  private requestObj(bet: BetOdd, isAdd: boolean = true): AddOddRequest {
    return {
      cCat: CouponCategory.Virtual,
      oddId: bet.id,
      add: isAdd,
      colAmount: bet.amount,
      isMultipleStake: true
    };
  }


  resetCoupon(): void {
    this.coupon = null;
    this.couponIdAdded = [];
  }

}
