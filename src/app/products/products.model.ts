import { BetCouponExtended } from '@elys/elys-coupon';
import { TypeBetSlipColTot } from './racing/racing.models';
import { VirtualBetCompetitor } from '@elys/elys-api';

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
  constructor(
    digitAmount?: number,
    totalAmount?: number,
    columnAmount?: number,
    columns?: number,
    typeSlipCol?: TypeBetSlipColTot,
    isEnabled?: boolean
  ) {
    this.digitAmount = digitAmount || 0.0;
    this.totalAmount = totalAmount || 0.0;
    this.columnAmount = columnAmount || 0.0;
    this.columns = columns || 0;
    this.typeSlipCol = typeSlipCol ? typeSlipCol : TypeBetSlipColTot.COL;
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
  statistics?: VirtualBetCompetitor[];
}
export class DialogData {
  title: string;
  betOdds?: BetOdds;
  breakpoint?: number;
  opened: boolean;
  betCoupon?: BetCouponExtended;
  statistics?: VirtualBetCompetitor[];
  constructor(
    betOdds?: BetOdds,
    breakpoint?: number,
    betCoupon?: BetCouponExtended,
    title?: string,
    statistics?: VirtualBetCompetitor[]
  ) {
    this.betOdds = betOdds;
    this.breakpoint = breakpoint;
    this.opened = false;
    this.betCoupon = betCoupon || null;
    this.statistics = statistics || null;
  }
}

export enum DialogTypeCoupon {
  CANCEL,
  PAY
}

/**
 * when "checked" parameter is true Destroycoupon is enabled
 */
export interface CouponConfirmDelete {
  productCodeRequest?: string;
  checked: boolean;
  isRacing?: boolean;
  racingNumber?: number;
}
