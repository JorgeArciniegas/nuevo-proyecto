import { Injectable } from '@angular/core';
import { Observable, Observable as ObservableIdle, Subject } from 'rxjs/Rx';
import { Dog, Race, RaceDetail, RaceTime } from './dogracing.models';

@Injectable({
  providedIn: 'root'
})
export class DogracingService {
  public raceDetails: RaceDetail;
  private remmaningTime: RaceTime = new RaceTime();

  public currentRaceSubscribe: Subject<number>;
  public currentRaceObserve: Observable<number>;

  dogList: Dog[];

  constructor() {
    this.raceDetails = new RaceDetail();
    this.raceDetails.currentRace = 0;
    this.defineRaces(377660);

    ObservableIdle.interval(1000).subscribe(() => this.getTime());

    this.currentRaceSubscribe = new Subject<number>();
    this.currentRaceObserve = this.currentRaceSubscribe.asObservable();

    this.currentRaceObserve.subscribe((race: number) => {
      this.raceDetails.currentRace = race;
      const myDate = this.remaningRaceTime(this.raceDetails.races[race].date);
      this.raceDetails.raceTime.minute = myDate.getMinutes();
      this.raceDetails.raceTime.second = myDate.getSeconds();
    });

    this.createDogList();
  }

  createDogList(): void {
    this.dogList = [];
    for (const i of [1, 2, 3]) {
      for (const d of [1, 2, 3, 4, 5, 6]) {
        const dog: Dog = new Dog();
        dog.number = d;
        dog.position = i;
        this.dogList.push(dog);
      }
    }
  }

  getTime(): void {
    if (this.remmaningTime.second === 0 && this.remmaningTime.minute === 0) {
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

  defineRaces(raceNumber: number) {
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
}
