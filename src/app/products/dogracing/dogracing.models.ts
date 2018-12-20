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
