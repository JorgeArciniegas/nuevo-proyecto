import { BetCouponOdd } from "@elys/elys-api";

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
