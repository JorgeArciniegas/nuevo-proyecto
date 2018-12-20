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
