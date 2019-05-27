import { TypeBetSlipColTot } from './racing/racing.models';
import { BetCouponExtended } from '@elys/elys-coupon';

export interface WindowSize {
  height: number;
  width: number;
  aspectRatio: number;
  columnHeight?: number;
  small?: boolean;
}

export class PolyfunctionalArea {
  selection?: string;
  value?: string | number;
  amount?: number;
  odds?: BetOdd[];
  labelColTot?: string;
  typeSlipCol?: TypeBetSlipColTot;
  activeAssociationCol?: boolean;
  activeDistributionTot?: boolean;
  constructor() {
    this.typeSlipCol = TypeBetSlipColTot.COL;
  }
}

export class PolyfunctionalStakeCoupon {
  digitAmount: number;
  totalAmount: number;
  columnAmount: number;
  columns: number;
  typeSlipCol: TypeBetSlipColTot;
  isEnabled: boolean;
  constructor(digitAmount?: number, totalAmount?: number, columnAmount?: number, columns?: number,
    typeSlipCol?: TypeBetSlipColTot, isEnabled?: boolean ) {
    this.digitAmount = digitAmount || 0.00;
    this.totalAmount = totalAmount || 0.00;
    this.columnAmount = columnAmount || 0.00;
    this.columns = columns || 0;
    this.typeSlipCol = (typeSlipCol) ? typeSlipCol : TypeBetSlipColTot.COL;
    this.isEnabled = isEnabled || false;
  }

}

export class BetOdd {
  id: number;
  label: string;
  odd: number;
  amount: number;
  selected: boolean;
  constructor(label: string, odd: number, amount: number, id: number) {
    this.id = id;
    this.label = label;
    this.odd = odd;
    this.amount = amount;
    this.selected = true;
  }
}

export class BetOdds {

  odds: BetOdd[];
  constructor() {
    this.odds = [];
  }
}

export interface BetDataDialog {
  title: string;
  betOdds?: BetOdds;
  betCoupon?: BetCouponExtended;
}
export class DialogData {
  title: string;
  betOdds?: BetOdds;
  breakpoint?: number;
  opened: boolean;
  betCoupon?: BetCouponExtended;
  constructor(betOdds?: BetOdds, breakpoint?: number, betCoupon?: BetCouponExtended, title?: string) {
    this.betOdds = betOdds;
    this.breakpoint = breakpoint;
    this.opened = false;
    this.betCoupon = betCoupon || null;
  }
}


export enum DialogTypeCoupon {
  CANCEL,
  PAY
}


/**
 * checked se true fa partire la visualizzazione del coupon
 *
 */
export interface CouponConfirmDelete {
  productCodeRequest?: string;
  checked: boolean;
  isRacing?: boolean;
  racingNumber?: number;

}
