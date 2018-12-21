export enum TypePlacingRace {
  'ST' = 0,
  'ACCG' = 1,
  'R' = 2
}
export enum SpecialBet {
  'EVEN' = 0,
  'ODD' = 1,
  'OVER' = 2,
  'UNDER' = 3
}
export class PlacingRace {
  raceNumber: number;
  typePlace: TypePlacingRace;
  dogs: Dog[];
  amount: number;
  repeat: number;
  isSpecialBets: boolean;
  specialBetValue: SpecialBet;
  timeBlocked: boolean;

  constructor() {
    this.raceNumber = 0;
    this.repeat = 1;
    this.amount = 0;
    this.isSpecialBets = false;
    this.dogs = [];
    // this.dogs = new Dog();
  }
}

export class Dog {
  number: number;
  selectable: boolean;
  actived: boolean;
  position: number;
  constructor() {
    this.number = 0;
    this.selectable = true;
    this.actived = false;
    this.position = 0;
  }
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

export class RaceResult {
  raceNumber: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
}
