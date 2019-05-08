import { BetCouponOdd } from '@elys/elys-api';
import { BetCouponExtended } from '@elys/elys-coupon';

export interface StakesDisplay {
  TotalStake: number;
  MaxWinning: number;
}

export interface OddsStakeEdit {
  indexOdd: number;
  tempStake: number;
  odd: BetCouponOdd;
  isDefaultInput: boolean;
}

export interface InternalCoupon extends BetCouponExtended {
  internal_isReadyToPlace?: boolean;
}

// Enum of the coupon's limites errors
export enum CouponLimit {
  MinBetStake,
  MaxBetStake,
  MaxSingleBetWin,
  MaxMultipleBetWin,
  MaxCombinationBetWin,
  MaxCouponOdds,
  MaxCouponEvents,
  MinBonusOdd,
  MaxCouponCombinations,
  MinGroupingsBetStake,
  MaxGroupingsBetStake,
  MaxCombinationsByGrouping,
  MaxCombinationsByCoupon,
  MinCombinationBetRate
}
