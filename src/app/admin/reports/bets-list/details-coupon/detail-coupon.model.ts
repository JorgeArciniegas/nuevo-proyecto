import { SummaryCoupon } from '@elys/elys-api';

export interface SummaryCouponExtended extends SummaryCoupon {
  pageOdd?: number;
  pageGrouping?: number;
}
