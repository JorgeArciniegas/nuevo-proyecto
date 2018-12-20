import { Injectable } from '@angular/core';
import { Observable, Observable as ObservableIdle, Subject } from 'rxjs/Rx';
import { Race, RaceDetail } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DogracingService {
  public raceDetails: RaceDetail;

  public currentRaceSubscribe: Subject<number>;
  public currentRaceObserve: Observable<number>;

  constructor() {
    this.raceDetails = new RaceDetail();
    this.defineRaces(377660);

    ObservableIdle.interval(1000).subscribe(() => this.getTime());

    this.currentRaceSubscribe = new Subject<number>();
    this.currentRaceObserve = this.currentRaceSubscribe.asObservable();

    this.currentRaceObserve.subscribe((race: number) => {
      this.raceDetails.currentRace = race;
      this.remaningRaceTime(this.raceDetails.races[race].date);
    });
  }

  getTime(): void {
    if (
      this.raceDetails.raceTime.second == 0 &&
      this.raceDetails.raceTime.minute == 0
    ) {
      this.defineRaces(this.raceDetails.races[0].number + 1);
    } else {
      if (this.raceDetails.raceTime.second == 0) {
        this.raceDetails.raceTime.second = 59;
        this.raceDetails.raceTime.minute = this.raceDetails.raceTime.minute - 1;
      } else {
        this.raceDetails.raceTime.second = this.raceDetails.raceTime.second - 1;
      }
    }
  }

  defineRaces(raceNumber: number) {
    const myDate: Date = new Date();

    myDate.setSeconds(0);
    myDate.setMinutes(myDate.getMinutes() + (5 - (myDate.getMinutes() % 5)));

    for (let index = 0; index < 5; index++) {
      const race: Race = new Race();
      race.number = raceNumber + index;
      race.date = new Date(myDate.getTime() + 5 * index * 60 * 1000);

      this.raceDetails.races[index] = race;
    }

    this.remaningRaceTime(this.raceDetails.races[0].date);
  }

  remaningRaceTime(endDate: Date) {
    const diff = endDate.getTime() - new Date().getTime();
    const myDate: Date = new Date(diff);
    this.raceDetails.raceTime.minute = myDate.getMinutes();
    this.raceDetails.raceTime.second = myDate.getSeconds();
  }
}
