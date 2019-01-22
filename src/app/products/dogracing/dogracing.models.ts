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
export enum SpecialBetValue {
  '2-4-6' = 0,
  '1-3-5' = 1,
  '4-5-6' = 2,
  '1-2-3' = 3
}

export enum Podium {
  'WINNER' = 1,
  'PLACED' = 2,
  'SHOW' = 3
}

export enum SmartCodeType {
  'V',
  '2P',
  '3P',
  'AO',
  'AS',
  'UP',
  'OP',
  'DP',
  'PP',
  'T',
  'TOX',
  'TNX',
  'VX',
  'ASX',
  'AOX',
  '1PX',
  '1VA'
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
  smartcode?: SmartCodeType;
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
  label: string;
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
  raceLabel: string;
  raceNumber: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
}