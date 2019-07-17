import { VirtualBetCompetitor, VirtualBetSelection } from '@elys/elys-api';
import { BetCouponExtended } from '@elys/elys-coupon';
import { LAYOUT_TYPE } from '../../../src/environments/environment.models';
import { TYPINGTYPE } from '../component/btncalc/btncalc.enum';
import { TypeBetSlipColTot } from './main/main.models';

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
  amountStr?: string;
  odds?: BetOdd[];
  labelColTot?: string;
  typeSlipCol?: TypeBetSlipColTot;
  activeAssociationCol?: boolean;
  activeDistributionTot?: boolean;
  hasDecimalSeparator?: boolean;
  firstTap?: boolean;
  disableInputCalculator?: boolean;
  constructor() {
    this.typeSlipCol = TypeBetSlipColTot.COL;
    this.firstTap = false;
    this.disableInputCalculator = false;
    this.amount = 0;
    this.hasDecimalSeparator = false;
    this.odds = [];
  }
}

export class PolyfunctionalStakeCoupon {
  digitAmount: number;
  totalAmount: number;
  columnAmount: number;
  columns: number;
  typeSlipCol: TypeBetSlipColTot;
  isEnabled: boolean;
  hasDecimalSeparator: boolean;
  constructor(
    digitAmount?: number,
    totalAmount?: number,
    columnAmount?: number,
    columns?: number,
    typeSlipCol?: TypeBetSlipColTot,
    isEnabled?: boolean,
    hasDecimalSeparator?: boolean
  ) {
    this.digitAmount = digitAmount || 0.0;
    this.totalAmount = totalAmount || 0.0;
    this.columnAmount = columnAmount || 0.0;
    this.columns = columns || 0;
    this.typeSlipCol = typeSlipCol ? typeSlipCol : TypeBetSlipColTot.COL;
    this.isEnabled = isEnabled || false;
    this.hasDecimalSeparator = hasDecimalSeparator || false;
  }
}
export class PolyfunctionStakePresetPlayer {
  typeSlipCol: TypeBetSlipColTot;
  amount: number;
  amountStr?: string;
  disableInputCalculator?: boolean;
  firstTap?: boolean;
  hasDecimalSeparator?: boolean;
  typingType: TYPINGTYPE;
  isPreset?: boolean;
  constructor(
    typeSlipCol: TypeBetSlipColTot,
    amount: number,
    isPreset?: boolean
  ) {
    this.typeSlipCol = typeSlipCol;
    this.amount = amount;
    this.amountStr = amount.toString();
    this.hasDecimalSeparator = false;
    this.firstTap = true;
    this.disableInputCalculator = false;
    this.isPreset = isPreset || true;
    this.typingType = TYPINGTYPE.BY_PRESET;
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
  statistics?: StatisticDialog;
}
export class DialogData {
  title: string;
  betOdds?: BetOdds;
  breakpoint?: number;
  opened: boolean;
  betCoupon?: BetCouponExtended;
  statistics?: StatisticDialog;
  constructor(
    betOdds?: BetOdds,
    breakpoint?: number,
    betCoupon?: BetCouponExtended,
    title?: string,
    statistics?: StatisticDialog
  ) {
    this.betOdds = betOdds;
    this.breakpoint = breakpoint;
    this.opened = false;
    this.betCoupon = betCoupon || null;
    this.statistics = statistics || null;
  }
}
export interface StatisticDialog {
  codeProduct: string;
  virtualBetCompetitor: VirtualBetCompetitor[];
  layoutProducts: LAYOUT_TYPE;
}
export enum DialogTypeCoupon {
  DELETE,
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
