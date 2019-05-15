import { CouponStatus, CouponType } from '@elys/elys-api';

export enum ProductEnum {
  ALL = -1,
  DOG = 0,
  HORSE,
  SOCCER,
  ROOSTER,
  KENO,
  ROULETTE
}


export namespace ProductEnum {

  export function values() {
    return Object.keys(ProductEnum).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}

export interface RequestBetsList {
  couponStatus: CouponStatus;
  dateFrom: Date;
  dateTo: Date;
  pageSize: number;
  requestedPage: number;
  ticketCode?: string;
  couponType: CouponType;
  complianceCode?: string;
  language: string;
  sportId?: number;
}
