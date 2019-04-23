import { Injectable } from '@angular/core';
import { CouponCategory } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { AddOddRequest, BetCouponExtended } from '@elys/elys-coupon/lib/elys-coupon.models';
import { Observable, Subject } from 'rxjs';
import { BetOdd } from 'src/app/products/products.model';
import { UserService } from 'src/app/services/user.service';
import { OddsStakeEdit, StakesDisplay } from './coupon.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  // coupon cache
  coupon: BetCouponExtended = null;
  couponIdAdded: number[] = [];

  private couponResponseSubject: Subject<BetCouponExtended>;
  couponResponse: Observable<BetCouponExtended>;
  // calculate stake and winning max
  stakeDisplay: StakesDisplay = { TotalStake: 0, MaxWinning: 0 };
  stakeDisplaySubject: Subject<StakesDisplay>;
  stakeDisplayObs: Observable<StakesDisplay>;

  // edit Odds Stake
  oddStakeEdit: OddsStakeEdit;
  oddStakeEditSubject: Subject<OddsStakeEdit>;
  oddStakeEditObs: Observable<OddsStakeEdit>;

  constructor(
    public elyscoupon: ElysCouponService,
    userService: UserService
  ) {
    this.couponResponseSubject = new Subject<BetCouponExtended>();
    this.couponResponse = this.couponResponseSubject.asObservable();

    this.elyscoupon.couponConfig.userId = userService.userDetail ? userService.userDetail.UserId : undefined;
    elyscoupon.couponHasChanged.subscribe(coupon => {
      this.coupon = coupon;
      this.couponResponseSubject.next(coupon);
      this.calculateAmounts();
    });

    this.stakeDisplaySubject = new Subject<StakesDisplay>();
    this.stakeDisplayObs = this.stakeDisplaySubject.asObservable();
    this.stakeDisplayObs.subscribe(elem => this.stakeDisplay = elem);
    // oddstakeEdit
    this.oddStakeEditSubject = new Subject<OddsStakeEdit>();
    this.oddStakeEditObs = this.oddStakeEditSubject.asObservable();
    this.oddStakeEditObs.subscribe( item => {
      this.oddStakeEdit = item;
      console.log(item);
    });
  }

  addRemoveToCoupon(smart: BetOdd[]): void {
    // console.log(smart);
    try {
      if (smart) {
        for (const bet of smart.filter(item => item.selected)) {
          let addBoolean = true;
          this.couponIdAdded.filter((item, idx) => {
            if (item === bet.id) {
              addBoolean = false;
              this.couponIdAdded.slice(idx);
            }
          });
          // add the id to couponIdAdded
          if (addBoolean) {
            this.couponIdAdded.push(bet.id);
          }
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
      selid: bet.id,
      add: isAdd,
      colAmount: bet.amount,
      isMultipleStake: true
    };
  }

  // clear all odds to coupon
  resetCoupon(): void {
    this.coupon = null;
    this.couponIdAdded = [];
    this.elyscoupon.betCoupon = null;
    // reset amount
    const stakesDisplayTemp: StakesDisplay = {
      TotalStake: 0,
      MaxWinning: 0
    };
    this.stakeDisplaySubject.next(stakesDisplayTemp);
  }

  /**
    * calculate stake and winning max
    * this sum does not consider groupings other than singles
    */
  calculateAmounts(): void {
    let stake = 0, Totalwin = 0;
    this.coupon.Odds.forEach(odd => { stake += odd.OddStake; Totalwin += odd.OddStake * odd.OddValue; });
    //
    const stakesDisplayTemp: StakesDisplay = {
      TotalStake: stake,
      MaxWinning: Totalwin
    };

    this.stakeDisplaySubject.next(stakesDisplayTemp);
  }


  updateCoupon(): void {
    if (this.oddStakeEdit.tempStake > 0) {
      this.coupon.Odds[this.oddStakeEdit.indexOdd].OddStake = this.oddStakeEdit.tempStake;
      this.elyscoupon.updateCoupon(this.coupon);
    }
    this.oddStakeEditSubject.next(null);
  }

}
