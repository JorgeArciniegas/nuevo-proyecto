import { CouponStatus, CouponType } from '@elys/elys-api';

export enum VirtualSportId {
  ALL = -1,
  DOG = 0,
  HORSE,
  SOCCER,
  ROOSTER,
  KENO,
  ROULETTE
}


export namespace VirtualSportId {

  export function values() {
    return Object.keys(VirtualSportId).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}


export enum CouponTypeInternal {
  ALL = 0,
  SingleBet = 1,
  MultipleBet = 2,
  CombinationsBet = 3
}

export namespace CouponTypeInternal {
  export function values() {
    return Object.keys(CouponTypeInternal).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}

export enum CouponStatusInternal  {
  ALL,
  Placed,
  Lost,
  Win
}


export namespace CouponStatusInternal {
  export function values() {
    return Object.keys(CouponStatusInternal).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
