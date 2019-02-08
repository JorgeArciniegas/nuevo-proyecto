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
  odd?: number;
  amount?: number;
  odds?: BetOdd[];
  constructor() {}
}

export class BetOdd {
  label: string;
  odd: number;
  amount: number;
  selected: boolean;
  constructor(label: string, odd: number, amount: number) {
    this.label = label;
    this.odd = odd;
    this.amount = amount;
    this.selected = true;
  }
}

export class BetOdds {
  title: string;
  odds: BetOdd[];
  constructor() {
    this.odds = [];
  }
}

export class DialogData {
  betOdds: BetOdds;
  breakpoint: number;

  constructor(betOdds: BetOdds, breakpoint: number) {
    this.betOdds = betOdds;
    this.breakpoint = breakpoint;
  }
}
