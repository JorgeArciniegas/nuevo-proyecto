import { Injectable } from '@angular/core';
import { BetCouponOdd, CouponCategory } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { AddOddRequest, BetCouponExtended, BetCouponOddExtended } from '@elys/elys-coupon/lib/elys-coupon.models';
import { Observable, Subject } from 'rxjs';
import { BetOdd } from '../../products/products.model';
import { UserService } from '../../services/user.service';
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

  constructor(public elyscoupon: ElysCouponService, userService: UserService) {
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
    this.stakeDisplayObs.subscribe(elem => (this.stakeDisplay = elem));
    // oddstakeEdit
    this.oddStakeEditSubject = new Subject<OddsStakeEdit>();
    this.oddStakeEditObs = this.oddStakeEditSubject.asObservable();
    this.oddStakeEditObs.subscribe(item => {
      this.oddStakeEdit = item;
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
        this.coupon.Odds[this.oddStakeEdit.indexOdd].OddStake = this.oddStakeEdit.tempStake;
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

  checkLimits(noCalculations: boolean = false): void {
    if (this.coupon.Odds.length > 0) {
      this.alertGids = [];
      let couponLimitExceded: CouponLimitExceded;
      this.couponLimitsExceded = [];
      let totCombinations = 0;
      let maxGroupCombinations = 0;
      let maxGroupStake = 0;
      let minGroupStake = 100000000;
      let maxMultipleCombinationBetWin = 0;
      let maxSingleCombinationBetWin = 0;
      let maxGroupBetWin = 0;
      let maxCouponWin = 0;
      let minCouponWin = 100000000;
      let hasSingle = false;
      let hasMulti = false;
      let activeGroupsCount = 0;
      let newStake = 0;
      let groupingWithMaxStake = 0;
      let groupingWithMaxMultipleCombinationBetWin = 0;
      let groupingWithMinStake = 0;
      let calcBetRate: number;
      const getOnlyFirstError = true;
      couponLimitExceded = {};
      const orderedCheckListGroups: string[] = [
        'MinCombinationBetRate',
        'MaxCombinationsByGrouping',
        'MaxGroupingsBetStake',
        'MinGroupingsBetStake'
      ];
      const orderedCheckListGeneral: string[] = [
        'MaxCouponOdds',
        'MaxCombinationsByCoupon',
        'MaxCouponCombinations',
        'MaxBetStake',
        'MinBetStake',
        'MaxCombinationBetWin',
        'MaxSingleBetWin',
        'MaxMultipleBetWin'
      ];
      let neededControlOnIsDiscretStake = true;
      // faccio parse dei gruppi con tutto quello che mi servirà
      for (const g of this.activeCoupon.Groupings) {
        this.alertGids[g.Grouping] = false;
        if (!g.Selected && g.Combinations === 1) {
          neededControlOnIsDiscretStake = false;
        }
        if (g.Selected) {
          if (g.Combinations > 1) {
            neededControlOnIsDiscretStake = false;
          }
          // verifico se il decimale è divisibile per il 'rate'
          if (g.Stake < this.activeCoupon.CouponLimit.MinGroupingsBetStake) {
            this.alertGids[g.Grouping] = true;
            couponLimitExceded = {
              limit: 'MinGroupingsBetStake',
              msg: 'SIDECOUPON.MIN_GROUPINGS_BET_STAKE'
            };
            this.couponLimitsExceded.push(couponLimitExceded);
          }
          if (g.Stake > this.activeCoupon.CouponLimit.MaxGroupingsBetStake) {
            this.alertGids[g.Grouping] = true;
            couponLimitExceded = {
              limit: 'MaxGroupingsBetStake',
              msg: 'SIDECOUPON.MAX_GROUPINGS_BET_STAKE'
            };
            this.couponLimitsExceded.push(couponLimitExceded);
          }
          // per i siti com se MinCombinationBetRate arriva a 0 si usa sempre 0.01 che è il minimo possibile da interfaccia
          calcBetRate =
            this.activeCoupon.CouponLimit.MinCombinationBetRate === 0 ? 0.01 : this.activeCoupon.CouponLimit.MinCombinationBetRate;
          if (Math.round(g.Stake * 100) % Math.round(calcBetRate * 100) !== 0) {
            this.alertGids[g.Grouping] = true;
            couponLimitExceded = {
              limit: 'MinCombinationBetRate',
              msg: 'SIDECOUPON.MIN_COMBINATION_BET_RATE'
            };
            this.couponLimitsExceded.push(couponLimitExceded);
          }
          if (g.Combinations > this.activeCoupon.CouponLimit.MaxCombinationsByGrouping) {
            this.alertGids[g.Grouping] = true;
            couponLimitExceded = {
              limit: 'MaxCombinationsByGrouping',
              msg: 'SIDECOUPON.MAX_COMBINATION_BY_GROUPINGS'
            };
            this.couponLimitsExceded.push(couponLimitExceded);
          }
          if (this.selectedTabIndex === 0) {
            if (g.Combinations === 1) {
              g.Stake = this.activeCoupon.Stake;
            } else {
              g.Stake = 0;
            }
          }
          if (!noCalculations) {
            g.MaxWinCombination = g.Stake * g.MaxWinCombinationUnit;
            g.MaxBonusCombination = g.Stake * g.MaxBonusCombinationUnit;
            newStake += g.Stake * g.Combinations;
          }
          if (g.Stake > maxGroupStake) {
            maxGroupStake = g.Stake;
            groupingWithMaxStake = g.Grouping;
          }
          if (g.Stake < minGroupStake) {
            minGroupStake = g.Stake;
            groupingWithMinStake = g.Grouping;
          }
          minGroupStake = g.Stake < minGroupStake ? g.Stake : minGroupStake;
          maxGroupBetWin = g.Stake * g.MaxWinUnit > maxGroupBetWin ? g.Stake * g.MaxWinUnit : maxGroupBetWin;
          maxCouponWin += g.Stake * (g.MaxWinUnit + g.MaxBonusUnit);
          minCouponWin = g.Stake * g.MaxWinUnit < minCouponWin ? minCouponWin : g.Stake * g.MaxWinUnit;
          activeGroupsCount += 1;
          totCombinations += g.Combinations;
          maxGroupCombinations = g.Combinations;
          if (g.Grouping === 1 && g.Combinations >= 1) {
            // sono nel gruppo singole
            maxSingleCombinationBetWin = Math.max(g.MaxWinCombination + g.MaxBonusCombination, maxSingleCombinationBetWin);
            hasSingle = true;
          } else if (g.Grouping > 1 && g.Combinations === 1) {
            // sono nel gruppo multipla (standard)
            if (g.MaxWinCombination + g.MaxBonusCombination > maxMultipleCombinationBetWin) {
              groupingWithMaxMultipleCombinationBetWin = g.Grouping;
            }
            maxMultipleCombinationBetWin = Math.max(g.MaxWinCombination + g.MaxBonusCombination, maxMultipleCombinationBetWin);
            hasMulti = true;
          } else {
            if (g.MaxWinCombination + g.MaxBonusCombination > maxMultipleCombinationBetWin) {
              groupingWithMaxMultipleCombinationBetWin = g.Grouping;
            }
            maxMultipleCombinationBetWin = Math.max(g.MaxWinCombination + g.MaxBonusCombination, maxMultipleCombinationBetWin);
            hasMulti = true;
          }
        }
      }
      if (!noCalculations) {
        this.activeCoupon.Stake = newStake;
      }
      _.forEach(this.activeCoupon.CouponLimit, (v, k, a) => {
        switch (k) {
          case 'MaxCouponOdds': //120
            if (this.activeCoupon.Odds.length > this.activeCoupon.CouponLimit[k]) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MAX_COUPON_ODDS'
              };
              this.couponLimitsExceded.push(couponLimitExceded);
              if (getOnlyFirstError) {
                return false;
              }
            }
            break;
          case 'MaxCombinationsByCoupon': //2000
            if (totCombinations > this.activeCoupon.CouponLimit[k]) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MAX_COMBINATION_BY_COUPON'
              };
              this.couponLimitsExceded.push(couponLimitExceded);
              if (getOnlyFirstError) {
                return false;
              }
            }
            break;
          case 'MaxCouponCombinations': //2500
            if (totCombinations > this.activeCoupon.CouponLimit[k]) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MAX_COUPON_COMBINATION'
              };
              this.couponLimitsExceded.push(couponLimitExceded);
              if (getOnlyFirstError) {
                return false;
              }
            }
            break;
          case 'MaxCombinationsByGrouping': //2000
            if (maxGroupCombinations > this.activeCoupon.CouponLimit[k]) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MAX_COMBINATION_BY_GROUPINGS'
              };
              this.couponLimitsExceded.push(couponLimitExceded);
              if (getOnlyFirstError) {
                return false;
              }
            }
            break;
          case 'MaxBetStake': //5000
            if (
              this.activeCoupon.Stake >
              Math.min(
                this.activeCoupon.CouponLimit[k],
                this.activeCoupon.UserId === 0 ? 1000000000 : this.activeCoupon.UserCouponLimit.MaxStake
              )
            ) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MAX_BET_STAKE'
              };
              this.alertGids[0] = true;
              this.couponLimitsExceded.push(couponLimitExceded);
              if (getOnlyFirstError) {
                return false;
              }
            }
            break;
          case 'MinBetStake': //2
            if (this.activeCoupon.Stake < this.activeCoupon.CouponLimit[k]) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MIN_BET_STAKE'
              };
              this.alertGids[0] = true;
              this.couponLimitsExceded.push(couponLimitExceded);
            }
            break;
          case 'MaxGroupingsBetStake': //10000
            if (maxGroupStake > this.activeCoupon.CouponLimit[k]) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MAX_GROUPINGS_BET_STAKE'
              };
              this.alertGids[groupingWithMaxStake] = true;
              this.couponLimitsExceded.push(couponLimitExceded);
              if (getOnlyFirstError) {
                return false;
              }
            }
            break;
          case 'MaxCombinationBetWin': //50000
            if (
              maxCouponWin >
              Math.min(
                this.activeCoupon.CouponLimit[k],
                this.activeCoupon.UserId === 0 ? 1000000000 : this.activeCoupon.UserCouponLimit.MaxLoss
              )
            ) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MAX_COMBINATION_BET_WIN'
              };
              this.couponLimitsExceded.push(couponLimitExceded);
              if (getOnlyFirstError) {
                return false;
              }
            }
            break;
          case 'MaxSingleBetWin': //10000
            if (hasSingle && maxSingleCombinationBetWin > this.activeCoupon.CouponLimit[k]) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MAX_SINGLE_BET_WIN'
              };
              this.couponLimitsExceded.push(couponLimitExceded);
              if (getOnlyFirstError) {
                return false;
              }
            }
            break;
          case 'MaxMultipleBetWin': //10000
            if (hasMulti && maxMultipleCombinationBetWin > this.activeCoupon.CouponLimit[k]) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MAX_MULTIPLE_BET_WIN'
              };
              this.alertGids[groupingWithMaxMultipleCombinationBetWin] = true;
              this.couponLimitsExceded.push(couponLimitExceded);
              if (getOnlyFirstError) {
                return false;
              }
            }
            break;
          case 'MinGroupingsBetStake': //0.05
            if (minGroupStake < this.activeCoupon.CouponLimit[k]) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.MIN_GROUPINGS_BET_STAKE'
              };
              this.alertGids[groupingWithMinStake] = true;
              this.couponLimitsExceded.push(couponLimitExceded);
              if (getOnlyFirstError) {
                return false;
              }
            }
            break;
          case 'MinBonusOdd': //1.25
            break;
          case 'MinCombinationBetRate': //0.05
            break;
          case 'IsDiscreteRateForSingleAndMultipleBets': //true
            if (
              neededControlOnIsDiscretStake &&
              this.activeCoupon.CouponLimit.IsDiscreteRateForSingleAndMultipleBets &&
              this.activeCoupon.Stake % 1 !== 0
            ) {
              couponLimitExceded = {
                limit: k,
                msg: 'SIDECOUPON.IS_DISCRETE_RATE_FOR_SINGLE_AND_MULTIPLE_BETS'
              };
              this.alertGids[groupingWithMinStake] = true;
              this.couponLimitsExceded.push(couponLimitExceded);
              this.alertGids[0] = true;
            }
            break;
          case 'ListIdCurrencyCouponGlobalVariable': //null
          default:
        }
      });
      if (this.couponLimitsExceded.length > 0) {
        this.disabledBet = true;
        //tengo solo il primo messaggio di errore
        this.couponLimitsExceded = [this.couponLimitsExceded[0]];
      } else {
        this.disabledBet = false;
      }
      window.clearTimeout(this.tOCA);
      if (this.couponLimitsExceded.length > 1) {
        this.tOCA = window.setTimeout(() => {
          this.nextCouponAlert();
        }, 5000);
      }
    } else {
      this.couponLimitsExceded = [];
    }
    // Used for refresh the value with the stake global coupon to recharge account value
    // when the user type logged is PV. This can happen only if the stake is over minimum limit of recharge ( 2.00 )
    this.importoRicarica = Math.max(2, this.activeCoupon.Stake);
  }
}
