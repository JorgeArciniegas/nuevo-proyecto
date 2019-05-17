import { Injectable } from '@angular/core';
import {
  BetCouponOdd,
  CancelCouponRequest,
  CancelCouponResponse,
  CouponCategory,
  ElysApiService,
  FlagAsPaidRequest,
  FlagAsPaidResponse,
  CouponType
} from '@elys/elys-api';
import { CouponServiceMessageType, ElysCouponService } from '@elys/elys-coupon';
import { AddOddRequest, BetCouponExtended, BetCouponOddExtended } from '@elys/elys-coupon';
import { Observable, Subject } from 'rxjs';
import { BetOdd } from '../../products/products.model';
import { UserService } from '../../services/user.service';
import { InternalCoupon, OddsStakeEdit, StakesDisplay, CouponLimit, Error } from './coupon.model';
import { PrintCouponService } from './print-coupon/print-coupon.service';
import { DEFAULT_BREAKPOINTS } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private messageType: typeof CouponServiceMessageType = CouponServiceMessageType;
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

  // Coupon messages variables
  warningMessages: string;
  error: Error;
  // Duration of the notification of warning's messages
  notificationInterval = 10000;

  constructor(
    public elysCoupon: ElysCouponService,
    userService: UserService,
    public printCoupon: PrintCouponService,
    public elysApi: ElysApiService
  ) {
    this.couponResponseSubject = new Subject<BetCouponExtended>();
    this.couponResponse = this.couponResponseSubject.asObservable();

    this.elysCoupon.couponConfig.userId = userService.userDetail ? userService.userDetail.UserId : undefined;
    elysCoupon.couponHasChanged.subscribe(coupon => {
      this.coupon = coupon;
      this.couponResponseSubject.next(coupon);
      if (coupon) {
        this.coupon.internal_isReadyToPlace = false;
        this.calculateAmounts();
      } else {
        this.resetCoupon();
      }
    });
    // Get the message from the coupon
    elysCoupon.couponServiceMessage.subscribe(message => {
      this.error = undefined;
      this.warningMessages = undefined;
      // Get coupon's message
      switch (message.messageType) {
        case this.messageType.error:
          this.error = new Error(message.message);
          break;
        case this.messageType.warning:
          this.warningMessages = message.message;
          // Check the coupon's limits
          this.checkLimits();
          // Set the visualization time of the warning
          setTimeout(() => (this.warningMessages = undefined), this.notificationInterval);
          break;
        default:
          // Check the coupon's limits
          this.checkLimits();
      }
    });
    this.stakeDisplaySubject = new Subject<StakesDisplay>();
    this.stakeDisplayObs = this.stakeDisplaySubject.asObservable();
    this.stakeDisplayObs.subscribe(elem => (this.stakeDisplay = elem));
    // oddstakeEdit
    this.oddStakeEditSubject = new Subject<OddsStakeEdit>();
    this.oddStakeEditObs = this.oddStakeEditSubject.asObservable();
    this.oddStakeEditObs.subscribe(item => {
      if (this.coupon.internal_isReadyToPlace !== null && !this.coupon.internal_isReadyToPlace) {
        this.oddStakeEdit = item;
      }
    });
  }

  addRemoveToCoupon(smart: BetOdd[]): void {
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
          this.elysCoupon.manageOdd(this.requestObj(bet, addBoolean));
        }
      }
    } catch (e) {
      // console.log('err', e);
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

  // Clear all odds to notificationInterval
  resetCoupon(): void {
    this.coupon = null;
    this.couponIdAdded = [];
    this.elysCoupon.betCoupon = null;
    // Reset message's variable
    this.error = undefined;
    this.warningMessages = undefined;
    // Reset amount
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
      totalWin = 0;
    this.coupon.Odds.forEach(odd => {
      stake += odd.OddStake;
    });
    //
    // The coupon has multipleStake
    // TO CHECK AGAIN WHEN OTHER GAMES WILL BE INTRODUCE
    this.coupon.Groupings.map(item => {
      if (!item.IsMultiStake && item.Selected) {
        item.Stake = stake / item.Combinations;
        item.MaxWinCombination = item.Stake * item.MaxWinCombinationUnit;
      }
      if (item.Selected) {
        totalWin += item.Stake * item.MaxWinCombinationUnit;
      }
    });

    const stakesDisplayTemp: StakesDisplay = {
      TotalStake: stake,
      MaxWinning: totalWin
    };

    this.stakeDisplaySubject.next(stakesDisplayTemp);
  }

  updateCoupon(): void {
    if (this.oddStakeEdit) {
      if (this.oddStakeEdit.tempStake > 0) {
        this.coupon.Odds[this.oddStakeEdit.indexOdd].OddStake = this.oddStakeEdit.tempStake;
        this.elysCoupon.updateCoupon(this.coupon);
      }
      this.oddStakeEditSubject.next(null);
    } else {
      this.elysCoupon.updateCoupon(this.coupon);
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
    if (this.oddStakeEdit && this.oddStakeEdit.odd.SelectionId === odd.SelectionId) {
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

  // Method to execute the coupon limits check.
  checkLimits() {
    // Check if it is a valid coupon
    if (this.coupon && this.coupon.CouponTypeId !== CouponType.Unknown) {
      // Get the MaxBetStake to verify
      const maxBetStake =
        this.coupon.CouponLimit.MaxBetStake < this.coupon.UserCouponLimit.MaxStake
          ? this.coupon.CouponLimit.MaxBetStake
          : this.coupon.UserCouponLimit.MaxStake;
      let maxBetWin: number;
      const error: Error = new Error();
      // Check the limitation by coupon type
      switch (this.coupon.CouponTypeId) {
        case CouponType.SingleBet:
          // Get the MaxBetWin to verify
          maxBetWin =
            this.coupon.CouponLimit.MaxSingleBetWin < this.coupon.UserCouponLimit.MaxLoss
              ? this.coupon.CouponLimit.MaxSingleBetWin
              : this.coupon.UserCouponLimit.MaxLoss;
          if (this.stakeDisplay.MaxWinning > maxBetWin) {
            // Check the MaxBetWin
            error.setError(CouponLimit[CouponLimit.MaxSingleBetWin], maxBetWin);
          } else if (this.coupon.Odds[0].OddStake < this.coupon.CouponLimit.MinBetStake) {
            // Check the MinBetStake
            error.setError(CouponLimit[CouponLimit.MinBetStake], this.coupon.CouponLimit.MinBetStake, this.coupon.Odds[0].SelectionId);
          } else if (this.coupon.Odds[0].OddStake > maxBetStake) {
            // Check the MaxBetStake
            error.setError(CouponLimit[CouponLimit.MaxBetStake], maxBetStake, this.coupon.Odds[0].SelectionId);
          }
          break;
        case CouponType.MultipleBet:
          break;
        case CouponType.CombinationsBet:
          // Get the MaxBetWin to verify
          maxBetWin =
            this.coupon.CouponLimit.MaxCombinationBetWin < this.coupon.UserCouponLimit.MaxLoss
              ? this.coupon.CouponLimit.MaxCombinationBetWin
              : this.coupon.UserCouponLimit.MaxLoss;
          if (this.stakeDisplay.TotalStake > maxBetStake) {
            // Check the MaxBetStake
            error.setError(CouponLimit[CouponLimit.MaxBetStake], maxBetStake);
          } else if (this.stakeDisplay.MaxWinning > maxBetWin) {
            // Check the MaxBetWin
            error.setError(CouponLimit[CouponLimit.MaxCombinationBetWin], maxBetWin);
          } else {
            for (const grouping of this.coupon.Groupings) {
              // Check the active groupings
              if (grouping.Selected) {
                // Check if it a system of singles
                const isASystemOfSingle = grouping.Grouping === 1;
                const isMultiStake = grouping.IsMultiStake;
                for (const odd of this.coupon.Odds) {
                  let oddStake: number;
                  // Get the oddStake
                  if (isMultiStake) {
                    oddStake = odd.OddStake;
                  } else {
                    oddStake = grouping.Stake;
                  }
                  // Check the MinGroupingsBetStake
                  if (oddStake < this.coupon.CouponLimit.MinGroupingsBetStake) {
                    // Check if this kind of error has already been created
                    if (error.message === CouponLimit[CouponLimit.MinGroupingsBetStake]) {
                      // Error already present. Add a new location to its array.
                      error.location.push(odd.SelectionId);
                    } else {
                      // Check if any other kind of error is already present
                      if (error.isEmpty()) {
                        // Create the error
                        error.setError(
                          CouponLimit[CouponLimit.MinGroupingsBetStake],
                          this.coupon.CouponLimit.MinGroupingsBetStake,
                          odd.SelectionId
                        );
                      }
                    }
                  } else if (oddStake > this.coupon.CouponLimit.MaxGroupingsBetStake) {
                    // Check the MaxGroupingsBetStake
                    if (error.message === CouponLimit[CouponLimit.MaxGroupingsBetStake]) {
                      error.location.push(odd.SelectionId);
                    } else {
                      // Check if any other kind of error is already present
                      if (error.isEmpty()) {
                        // Create the error
                        error.setError(
                          CouponLimit[CouponLimit.MaxGroupingsBetStake],
                          this.coupon.CouponLimit.MaxGroupingsBetStake,
                          odd.SelectionId
                        );
                      }
                    }
                  } else if (isASystemOfSingle) {
                    // For a system of singles
                    // Check if the win of the single with the highest odd rispect the limit
                    if (grouping.MaxWinCombination > this.coupon.CouponLimit.MaxSingleBetWin) {
                      const singleWin = oddStake * odd.OddValue;
                      // Check the "MaxSingleBetWin"
                      if (singleWin > this.coupon.CouponLimit.MaxSingleBetWin) {
                        if (error.message === CouponLimit[CouponLimit.MaxSingleBetWin]) {
                          this.error.location.push(odd.SelectionId);
                        } else {
                          // Check if any other kind of error is already present
                          if (error.isEmpty()) {
                            // Create the error
                            error.setError(
                              CouponLimit[CouponLimit.MaxSingleBetWin],
                              this.coupon.CouponLimit.MaxSingleBetWin,
                              odd.SelectionId
                            );
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          break;
      }
      // Set the error variable if an error has occurerd
      if (!error.isEmpty()) {
        this.error = error;
      }
    }
  }

  /**
   *
   */
  async preStagedCoupon(): Promise<void> {
    if (!this.coupon && this.coupon.Odds.length > 0) {
      return;
    }
    // call api
    await this.elysCoupon.updateCoupon(this.coupon);
    // enabled process to staging coupon
    this.coupon.internal_isReadyToPlace = true;
  }

  checkIfCouponIsReadyToPlace(): boolean {
    return this.coupon && this.coupon.internal_isReadyToPlace ? this.coupon.internal_isReadyToPlace : false;
  }

  /**
   *
   */
  cancelStagingCoupon(): void {
    this.coupon.internal_isReadyToPlace = false;
  }

  stagedCoupon(): void {
    this.elysCoupon.placeCoupon(this.coupon);
  }

  /**
   * Method to make the payment of a coupon
   * @param request Request object
   */
  flagAsPaidCoupon(request: FlagAsPaidRequest): Promise<FlagAsPaidResponse> {
    try {
      return this.elysApi.coupon.flagAsPaidCoupon(request);
    } catch (err) {
      throw err.error.error_description;
    }
  }

  /**
   * Method to cancel a coupon
   * @param request Request object
   */
  cancelCoupon(request: CancelCouponRequest): Promise<CancelCouponResponse> {
    try {
      return this.elysApi.coupon.cancelCoupon(request);
    } catch (err) {
      throw err.statusText;
    }
  }
}
