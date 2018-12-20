export enum TypePlacingRace {
  ST = 0,
  ACCG = 1,
  R = 2
}

export class PlacingRace {
  raceNumber: number;
  typePlace: TypePlacingRace;
  columns: ColumnRace[];
  amount: number;
  repeat: number;
}
export class ColumnRace {
  firstSelected: number[];
  secondSelected: number[];
  thirdSeelcted: number[];
  isSpecialBets: boolean;
  ou: string;
  eo: string;
}
export class RaceTime {
  minute: number;
  second: number;
}

export class Race {
  number: number;
  date: Date;
}

export class RaceDetail {
  constructor() {
    this.raceTime = new RaceTime();
    this.races = new Array(5);
    this.currentRace = 0;
  }
  raceTime: RaceTime;
  races: Race[];
  currentRace: number;
}
