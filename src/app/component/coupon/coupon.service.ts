import { Injectable } from '@angular/core';
import { BetCouponOdd, CouponCategory } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import {
  AddOddRequest,
  BetCouponExtended,
  BetCouponOddExtended
} from '@elys/elys-coupon/lib/elys-coupon.models';
import { Observable, Subject } from 'rxjs';
import { BetOdd } from '../../products/products.model';
import { UserService } from '../../services/user.service';
import { OddsStakeEdit, StakesDisplay, InternalCoupon } from './coupon.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  // coupon cache
  coupon: InternalCoupon = null;
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

  constructor(public elyscoupon: ElysCouponService, userService: UserService) {
    this.couponResponseSubject = new Subject<BetCouponExtended>();
    this.couponResponse = this.couponResponseSubject.asObservable();

    this.elyscoupon.couponConfig.userId = userService.userDetail
      ? userService.userDetail.UserId
      : undefined;
    elyscoupon.couponHasChanged.subscribe(coupon => {
      this.coupon = coupon;
      this.couponResponseSubject.next(coupon);
      if (coupon) {
        this.coupon.internal_isReadyToPlace = false;
        this.calculateAmounts();
      } else {
        this.resetCoupon();
      }
    });

    this.stakeDisplaySubject = new Subject<StakesDisplay>();
    this.stakeDisplayObs = this.stakeDisplaySubject.asObservable();
    this.stakeDisplayObs.subscribe(elem => (this.stakeDisplay = elem));
    // oddstakeEdit
    this.oddStakeEditSubject = new Subject<OddsStakeEdit>();
    this.oddStakeEditObs = this.oddStakeEditSubject.asObservable();
    this.oddStakeEditObs.subscribe(item => {
      if (!this.coupon.internal_isReadyToPlace) {
        this.oddStakeEdit = item;
      }

    });
  }

  addRemoveToCoupon(smart: BetOdd[]): void {
    // console.log(smart);
    try {
      if (this.coupon && this.coupon.internal_isReadyToPlace) {
        return;
      }
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
    let stake = 0,
      Totalwin = 0;
    this.coupon.Odds.forEach(odd => {
      stake += odd.OddStake;
      Totalwin += odd.OddStake * odd.OddValue;
    });
    //
    const stakesDisplayTemp: StakesDisplay = {
      TotalStake: stake,
      MaxWinning: Totalwin
    };

    this.stakeDisplaySubject.next(stakesDisplayTemp);
  }

  updateCoupon(): void {
    if (this.oddStakeEdit) {
      if (this.oddStakeEdit.tempStake > 0) {
        this.coupon.Odds[
          this.oddStakeEdit.indexOdd
        ].OddStake = this.oddStakeEdit.tempStake;
        this.elyscoupon.updateCoupon(this.coupon);
      }
      this.oddStakeEditSubject.next(null);
    } else {
      this.elyscoupon.updateCoupon(this.coupon);
    }
  }

  checkOddToChangeStake(odd: BetCouponOdd): void {
    const tempOdd: OddsStakeEdit = {
      indexOdd: -1,
      tempStake: 0.0,
      odd: null,
      isDefaultInput: false
    };
    // search if the odd is selected and it reset
    if (
      this.oddStakeEdit &&
      this.oddStakeEdit.odd.SelectionId === odd.SelectionId
    ) {
      this.oddStakeEditSubject.next(null);
      return;
    }
    // filter the odd to coupon and extract the index and value
    this.coupon.Odds.filter((item: BetCouponOddExtended, idx) => {
      if (item.SelectionId === odd.SelectionId) {
        tempOdd.indexOdd = idx;
        tempOdd.odd = item;
      }
    });

    this.oddStakeEditSubject.next(tempOdd);
  }
  /**
   *
   */
  async preStagedCoupon(): Promise<void> {
    if (!this.coupon && this.coupon.Odds.length > 0) { return; }
    // call api
    await this.elyscoupon.updateCoupon(this.coupon);
    // enabled process to staging coupon
    this.coupon.internal_isReadyToPlace = true;

  }


  checkIfCouponIsReadyToPlace(): boolean {
    return (this.coupon && this.coupon.internal_isReadyToPlace) ? this.coupon.internal_isReadyToPlace : false;
  }

  /**
   *
   */
  cancelStagingCoupon(): void {
    this.coupon.internal_isReadyToPlace = false;
  }

  stagedCoupon(): void {
    this.elyscoupon.placeCoupon(this.coupon);
  }

/*
  stagedCoupon(): void {
    this.elyscoupon.c
  } */
}
