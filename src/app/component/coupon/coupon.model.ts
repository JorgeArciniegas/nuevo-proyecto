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
export interface CouponLimitExceded {
  limit?: string;
  msg?: string;
  filed?: string;
}
