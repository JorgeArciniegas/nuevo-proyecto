export interface WindowSize {
  height: number;
  width: number;
  aspectRatio: number;
  columnHeight?: number;
}

export class PolyfunctionalArea {
  selection?: string;
  value?: string | number;
  odd?: number;
  amount?: number;
  constructor() {}
}

export class BetOdd {
  label: string;
  odd: number;
  amount: number;
  constructor(label: string, odd: number, amount: number) {
    this.label = label;
    this.odd = odd;
    this.amount = amount;
  }
}

export class BetOdds {
  title: string;
  odds: BetOdd[];
  constructor() {
    this.odds = [];
  }
}
