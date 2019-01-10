import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import {
  CountDown,
  Race as RaceApi,
  Tournament,
  TreeSports
} from 'src/app/services/vgen.model';
import { VgenService } from 'src/app/services/vgen.service';
import {
  Dog,
  PlacingRace,
  Race,
  RaceDetail,
  RaceResult,
  RaceTime
} from './dogracing.models';

@Injectable({
  providedIn: 'root'
})
export class DogracingService {
  // screen binding
  public raceDetails: RaceDetail;
  public listResult: RaceResult[];
  // api binding
  private reload: number;
  private cacheRaces: RaceApi[] = [];
  // working variable
  private remmaningTime: RaceTime = new RaceTime();
  placingRace: PlacingRace; // place the global race
  placingRaceSubject: Subject<PlacingRace>;
  public currentRaceSubscribe: Subject<number>;
  public currentRaceObserve: Observable<number>;

  dogList: Dog[];

  constructor(private vgenService: VgenService) {
    this.raceDetails = new RaceDetail();
    this.raceDetails.currentRace = 0;
    this.loadRaces();
    this.initListResult();

    Observable.interval(1000).subscribe(() => this.getTime());

    this.currentRaceSubscribe = new Subject<number>();
    this.currentRaceObserve = this.currentRaceSubscribe.asObservable();

    this.currentRaceObserve.subscribe((raceIndex: number) => {
      console.log('selected', raceIndex);
      this.raceDetails.currentRace = raceIndex;
      this.remaningRaceTime(this.raceDetails.races[raceIndex].number).then(
        (raceTime: RaceTime) => {
          this.raceDetails.raceTime = raceTime;
        }
      );
    });

    this.placingRaceSubject = new Subject<PlacingRace>();

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
    console.log('remmaningTime', this.remmaningTime);
    if (this.remmaningTime.second === 0 && this.remmaningTime.minute === 0) {
      this.addNewResult(this.raceDetails.races[0].number);
      this.loadRaces();
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
        // check time blocked
        if (
          this.raceDetails.raceTime.second <= 10 &&
          this.raceDetails.raceTime.minute === 0
        ) {
          this.placingRace.timeBlocked = true;
        } else {
          this.placingRace.timeBlocked = false;
        }
      }
      // showed second
      this.raceDetails.raceTime.second = this.remmaningTime.second;
    }
  }

  loadRaces(): void {
    if (this.cacheRaces == null || this.cacheRaces.length === 0) {
      this.loadRacesFromApi(true);
    } else {
      // delete the first element
      this.cacheRaces.shift();
      this.raceDetails.races.shift();

      // add the new race
      const race: Race = new Race();
      race.number = this.cacheRaces[4].id;
      race.label = this.cacheRaces[4].nm;
      race.date = new Date(this.cacheRaces[4].sdtoffset);

      this.raceDetails.races[4] = race;

      this.currentAndSelectedRaceTime();
      this.reload--;

      if (this.reload <= 0) {
        // if remain only 1 new race reload other race
        this.loadRacesFromApi();
      }
      console.log('Races', JSON.stringify(this.cacheRaces));
    }
  }

  loadRacesFromApi(all: boolean = false) {
    this.vgenService.programmetree(8, 'DOG').then((sports: TreeSports) => {
      const tournament: Tournament = sports.Sports[0].ts[0];

      if (all) {
        // load all race
        this.cacheRaces = tournament.evs;
        for (let index = 0; index < 5; index++) {
          const race: Race = new Race();
          race.number = this.cacheRaces[index].id;
          race.label = this.cacheRaces[index].nm;
          race.date = new Date(this.cacheRaces[index].sdtoffset);

          this.raceDetails.races[index] = race;
        }
        this.currentAndSelectedRaceTime();
        this.currentRaceSubscribe.next(0);
      } else {
        // add only new race
        tournament.evs.forEach((race: RaceApi) => {
          if (
            this.cacheRaces.filter(
              (cacheRace: RaceApi) => cacheRace.id === race.id
            ).length === 0
          ) {
            this.cacheRaces.push(race);
          }
        });
      }
      this.reload = 4;
      console.log('Load Races', JSON.stringify(this.cacheRaces));
    });
  }

  currentAndSelectedRaceTime() {
    // check current race index, if is selected a reace decrease the index because the first race is completed and removed
    if (this.raceDetails.currentRace > 0) {
      this.raceDetails.currentRace = this.raceDetails.currentRace - 1;
    }

    // calculate remaning time for selected race
    this.remaningRaceTime(
      this.raceDetails.races[this.raceDetails.currentRace].number
    ).then((raceTime: RaceTime) => {
      this.raceDetails.raceTime = raceTime;
      if (this.raceDetails.currentRace === 0) {
        this.remmaningTime.minute = raceTime.minute;
        this.remmaningTime.second = raceTime.second;
      }
    });

    // calculate remaning time
    if (this.raceDetails.currentRace > 0) {
      this.remaningRaceTime(this.raceDetails.races[0].number).then(
        (raceTime: RaceTime) => (this.remmaningTime = raceTime)
      );
    }
  }

  remaningRaceTime(idRace: number): Promise<RaceTime> {
    return this.vgenService.countdown(8, idRace).then((value: CountDown) => {
      const sec: number = value.CountDown / 10000000;
      const raceTime: RaceTime = new RaceTime();
      raceTime.minute = Math.floor(sec / 60);
      raceTime.second = Math.floor(sec % 60);
      console.log('countdown', raceTime);
      return raceTime;
    });
  }

  initListResult(): void {
    const raceNumber = 123456;
    this.listResult = [];
    for (const i of [4, 3, 2, 1]) {
      this.addNewResult(raceNumber - i, true);
    }
  }

  addNewResult(raceNumber: number, unshift: boolean = false): void {
    if (!unshift) {
      this.listResult.shift();
    }

    const arrResult: number[] = [];
    while (arrResult.length < 3) {
      const r = Math.floor(Math.random() * 5) + 1;
      if (arrResult.indexOf(r) === -1) {
        arrResult.push(r);
      }
    }

    this.listResult.push({
      raceNumber: raceNumber,
      firstPlace: arrResult[0],
      secondPlace: arrResult[1],
      thirdPlace: arrResult[2]
    });
  }
}
