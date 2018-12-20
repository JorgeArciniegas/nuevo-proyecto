export interface Product {
  name: string;
  label: string;
  defaultAmount: number[];
}

export class RaceTime {
  constructor() {
    this.minute = 5;
    this.second = 0;
  }
  minute: number;
  second: number;
}
