import { Injectable } from '@angular/core';
import { Observable, Observable as ObservableIdle, Subject } from 'rxjs/Rx';
import { Race, RaceDetail, RaceResult, RaceTime } from './dogracing.models';

@Injectable({
  providedIn: 'root'
})
export class DogracingService {
  public raceDetails: RaceDetail;
  private remmaningTime: RaceTime = new RaceTime();
  public listResult: RaceResult[];

  public currentRaceSubscribe: Subject<number>;
  public currentRaceObserve: Observable<number>;

  constructor() {
    this.raceDetails = new RaceDetail();
    this.raceDetails.currentRace = 0;
    this.defineRaces(377660);
    this.initListResult(377660);

    ObservableIdle.interval(1000).subscribe(() => this.getTime());

    this.currentRaceSubscribe = new Subject<number>();
    this.currentRaceObserve = this.currentRaceSubscribe.asObservable();

    this.currentRaceObserve.subscribe((race: number) => {
      this.raceDetails.currentRace = race;
      const myDate = this.remaningRaceTime(this.raceDetails.races[race].date);
      this.raceDetails.raceTime.minute = myDate.getMinutes();
      this.raceDetails.raceTime.second = myDate.getSeconds();
    });
  }

  getTime(): void {
    if (this.remmaningTime.second === 0 && this.remmaningTime.minute === 0) {
      this.addNewResult(this.raceDetails.races[0].number);
      this.defineRaces(this.raceDetails.races[0].number + 1);
    } else {
      if (this.remmaningTime.second === 0) {
        // remaing time
        this.remmaningTime.second = 59;
        this.remmaningTime.minute = this.remmaningTime.minute - 1;
        // remaing showed time
        this.raceDetails.raceTime.minute = this.raceDetails.raceTime.minute - 1;
      } else {
        // remaing time
        this.remmaningTime.second = this.remmaningTime.second - 1;
      }
      // showed second
      this.raceDetails.raceTime.second = this.remmaningTime.second;
    }
  }

  defineRaces(raceNumber: number): void {
    let myDate: Date = new Date();

    myDate.setSeconds(0);
    myDate.setMinutes(myDate.getMinutes() + (5 - (myDate.getMinutes() % 5)));

    for (let index = 0; index < 5; index++) {
      const race: Race = new Race();
      race.number = raceNumber + index;
      race.date = new Date(myDate.getTime() + 5 * index * 60 * 1000);

      this.raceDetails.races[index] = race;
    }

    // check current race
    if (this.raceDetails.currentRace > 0) {
      this.raceDetails.currentRace = this.raceDetails.currentRace - 1;
    }

    // calculate remaning time for selected race
    myDate = this.remaningRaceTime(
      this.raceDetails.races[this.raceDetails.currentRace].date
    );
    this.raceDetails.raceTime.minute = myDate.getMinutes();
    this.raceDetails.raceTime.second = myDate.getSeconds();

    // calculate remaning time
    myDate = this.remaningRaceTime(this.raceDetails.races[0].date);
    this.remmaningTime.minute = myDate.getMinutes();
    this.remmaningTime.second = myDate.getSeconds();
  }

  remaningRaceTime(endDate: Date): Date {
    const diff = endDate.getTime() - new Date().getTime();
    return new Date(diff);
  }

  initListResult(raceNumber: number): void {
    this.listResult = [];
    this.listResult.push({
      raceNumber: raceNumber - 4,
      firstPlace: 2,
      secondPlace: 4,
      thirdPlace: 1
    });
    this.listResult.push({
      raceNumber: raceNumber - 3,
      firstPlace: 1,
      secondPlace: 3,
      thirdPlace: 6
    });
    this.listResult.push({
      raceNumber: raceNumber - 2,
      firstPlace: 6,
      secondPlace: 2,
      thirdPlace: 3
    });
    this.listResult.push({
      raceNumber: raceNumber - 1,
      firstPlace: 5,
      secondPlace: 4,
      thirdPlace: 2
    });
  }

  addNewResult(raceNumber: number): void {
    this.listResult.shift();

    this.listResult.push({
      raceNumber: raceNumber,
      firstPlace: Math.floor(Math.random() * 5) + 1,
      secondPlace: Math.floor(Math.random() * 5) + 1,
      thirdPlace: Math.floor(Math.random() * 5) + 1
    });
  }
}
