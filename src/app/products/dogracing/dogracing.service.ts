import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  CountDown,
  EventResults,
  Market,
  Race as RaceApi,
  SportDetail,
  Tournament,
  TreeSports
} from 'src/app/services/vgen.model';
import { VgenService } from 'src/app/services/vgen.service';
import { BetOdd, PolyfunctionalArea } from '../products.model';
import { ProductsService } from '../products.service';
import {
  Dog,
  Lucky,
  PlacingRace,
  Podium,
  Race,
  RaceDetail,
  RaceResult,
  RaceTime,
  Smartcode,
  SmartCodeType,
  SpecialBet,
  SpecialBetValue
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
  // temp array

  smartCode: Smartcode;

  constructor(
    private vgenService: VgenService,
    private productService: ProductsService
  ) {
    this.raceDetails = new RaceDetail();
    this.raceDetails.currentRace = 0;

    Observable.interval(1000).subscribe(() => this.getTime());

    this.currentRaceSubscribe = new Subject<number>();
    this.currentRaceObserve = this.currentRaceSubscribe.asObservable();

    this.loadRaces();
    this.loadLastResult(false);

    this.currentRaceObserve.subscribe((raceIndex: number) => {
      this.raceDetails.currentRace = raceIndex;
      this.remaningRaceTime(this.raceDetails.races[raceIndex].number).then(
        (raceTime: RaceTime) => {
          this.raceDetails.raceTime = raceTime;
        }
      );

      this.resetPlayRacing();
      // get race odds
      this.raceDetailOdds(this.raceDetails.races[raceIndex].number);
    });

    this.placingRaceSubject = new Subject<PlacingRace>();

    this.productService.playableBoardResetObserve.subscribe(reset => {
      if (reset) {
        this.resetPlayRacing();
      }
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
      this.loadRaces();
      this.loadLastResult();
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
          this.productService.closeProductDialog();
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

      // get race odds
      this.raceDetailOdds(this.raceDetails.races[0].number);
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
    });
  }

  currentAndSelectedRaceTime() {
    // check current race index, if is selected a reace decrease the index because the first race is completed and removed
    if (this.raceDetails.currentRace > 0) {
      this.raceDetails.currentRace = this.raceDetails.currentRace - 1;
    } else if (this.raceDetails.currentRace === 0) {
      this.resetPlayRacing();
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
      return raceTime;
    });
  }

  loadLastResult(delay: boolean = true): void {
    if (delay) {
      Observable.timer(10000).subscribe(() => this.getLastResult());
    } else {
      this.getLastResult();
    }
  }

  getLastResult() {
    this.listResult = [];
    Observable.timer(300).subscribe(() => {
      this.vgenService
        .latesResult(8, 'DOG')
        .then((eventResults: EventResults) => {
          for (const i of [3, 2, 1, 0]) {
            const results: string[] = eventResults.EventResults[i].Result.split(
              '-'
            );

            this.listResult.push({
              raceLabel: eventResults.EventResults[i].EventName,
              raceNumber: eventResults.EventResults[i].EventId,
              firstPlace: Number.parseInt(results[0]),
              secondPlace: Number.parseInt(results[1]),
              thirdPlace: Number.parseInt(results[2])
            });
          }
        });
    });
  }

  resetPlayRacing(): void {
    this.placingRace = new PlacingRace();
    this.smartCode = new Smartcode();
    this.placingRace.raceNumber = this.raceDetails.races[
      this.raceDetails.currentRace
    ].number;
    this.createDogList();

    this.productService.polyfunctionalAreaSubject.next(null);
  }

  raceDetailOdds(raceNumber: number): void {
    const race: RaceApi = this.cacheRaces.filter(
      (cacheRace: RaceApi) => cacheRace.id === raceNumber
    )[0];

    // check, if is empty load from api
    if (race.mk == null || race.mk.length === 0) {
      this.vgenService
        .raceDetails(8, raceNumber)
        .then((sportDetail: SportDetail) => {
          race.mk = sportDetail.Sport.ts[0].evs[0].mk;
          race.tm = sportDetail.Sport.ts[0].evs[0].tm;
        });
    }
  }

  /**
   * PLACING THE DOG SELECTED INSIDE TO POLYFUNCTIONAL AREA AND SMARTBET
   * @param dog
   */
  placingOdd(dog: Dog): void {
    if (this.placingRace.isSpecialBets) {
      this.resetPlayRacing();
    }
    let removed: boolean;

    if (!this.placingRace) {
      this.placingRace.raceNumber = this.raceDetails.races[
        this.raceDetails.currentRace
      ].number;
    }
    dog.actived = true;

    if (this.placingRace.dogs.length === 0) {
      this.placingRace.dogs.push(dog);
      this.checkedIsSelected(dog);
    } else {
      this.placingRace.dogs.filter((item, idx) => {
        if (item.number === dog.number && item.position === dog.position) {
          this.placingRace.dogs.splice(idx, 1);
          this.checkedIsSelected(dog, true);
          removed = true;
        }
      });
      if (!removed) {
        this.placingRace.dogs.push(dog);
        this.checkedIsSelected(dog);
      }
    }
    this.placeOdd();
  }

  placeOdd() {
    // extract the raceOdd from cache
    const odds: RaceApi = this.cacheRaces.filter(
      (cacheRace: RaceApi) => cacheRace.id === this.placingRace.raceNumber
    )[0];
    this.smartCode = new Smartcode();

    this.populatingPolyfunctionArea(odds);
  }

  private checkedIsSelected(dog: Dog, reset: boolean = false): void {
    this.dogList.forEach((d: Dog) => {
      if (d.number === dog.number && d.position !== dog.position && !reset) {
        d.selectable = false;
      } else if (d.number === dog.number && reset) {
        d.selectable = true;
        d.actived = false;
      }
    });
  }

  /**
   * RNG FOR TO PLACE THE LUCKY
   */

  RNGLucky2(lucky: Lucky): number {
    const extractNumber: number =
      Math.floor(
        Math.random() *
          this.dogList.filter(dog => dog.position === lucky).length
      ) + 1;
    return extractNumber;
  }

  RNGLuckyPlacing(dogNumber: number, dogPosition: number): void {
    // extract the dog
    const dogExtract: Dog = this.dogList.filter(
      dog => dog.position === dogPosition && dog.number === dogNumber
    )[0];
    // place the dog
    this.placingOdd(dogExtract);
  }

  /**
   * Create a polyfunctional object for showing and insert the odds to coupon
   * @param odd
   */
  populatingPolyfunctionArea(odd: RaceApi): void {
    let areaFuncData: PolyfunctionalArea = {};
    try {
      // check if is first insert
      // else if specialbets OVER / UNDER / EVEN / ODD
      let dogName: string;
      if (
        this.placingRace.dogs.length === 1 &&
        !this.placingRace.isSpecialBets
      ) {
        areaFuncData.selection = Podium[this.placingRace.dogs[0].position];
        areaFuncData.value = this.placingRace.dogs[0].number;
        // match dog from object tm with mk
        dogName = odd.tm.filter(t => t.ito === areaFuncData.value)[0].nm;
      } else if (
        this.placingRace.dogs.length > 1 &&
        !this.placingRace.isSpecialBets
      ) {
        this.placingRace.dogs.forEach(item => {
          if (item.position === 1) {
            this.smartCode.selWinner.push(item.number);
          } else if (item.position === 2) {
            this.smartCode.selPlaced.push(item.number);
          } else if (item.position === 3) {
            this.smartCode.selPodium.push(item.number);
          }
        });
      } else if (this.placingRace.isSpecialBets) {
        // setting label selection
        areaFuncData.selection = SpecialBet[this.placingRace.specialBetValue];
        areaFuncData.value = SpecialBetValue[this.placingRace.specialBetValue];
      }

      // check smartcode
      areaFuncData = this.checkSmartCode(areaFuncData);
      areaFuncData.amount = 1;
      if (this.smartCode.code) {
        areaFuncData.selection = this.smartCode.code;
        areaFuncData = this.extractOdd(odd, areaFuncData);
      } else {
        // extract odds
        areaFuncData = this.extractOdd(odd, areaFuncData, dogName);
      }
    } catch (err) {
      areaFuncData = {};
    } finally {
      this.productService.polyfunctionalAreaSubject.next(areaFuncData);
    }
  }

  /**
   *
   * @param odd
   * @param areaFuncData
   * @param dogName
   */
  private extractOdd(
    odd: RaceApi,
    areaFuncData: PolyfunctionalArea,
    dogName?: string
  ): PolyfunctionalArea {
    let oddsToSearch: string[] = [];
    if (
      areaFuncData.selection === '1VA' ||
      areaFuncData.selection === 'AOX' ||
      areaFuncData.selection === 'TOX'
    ) {
      oddsToSearch = this.generateOdds(areaFuncData.value.toString());
    }

    for (const m of odd.mk.filter(
      (market: Market) =>
        market.tp === this.typeSelection(areaFuncData.selection)
    )) {
      // if the selection is PODIUM, WINNER or SHOW
      if (dogName) {
        for (const checkOdd of m.sls.filter(o => o.nm === dogName)) {
          areaFuncData.odd = checkOdd.ods[0].vl;
        }
      } else if (!this.smartCode.code) {
        // if the selection is EVEN, ODD, UNDER or OVER
        for (const checkOdd of m.sls.filter(
          o => o.nm.toUpperCase() === areaFuncData.selection.toUpperCase()
        )) {
          areaFuncData.odd = checkOdd.ods[0].vl;
        }
      } else {
        if (oddsToSearch.length > 0) {
          areaFuncData.odds = [];
          // search for multiple odds
          for (const checkOdd of m.sls) {
            if (oddsToSearch.includes(checkOdd.nm)) {
              areaFuncData.odds.push(
                new BetOdd(
                  checkOdd.nm,
                  checkOdd.ods[0].vl,
                  areaFuncData.amount / oddsToSearch.length
                )
              );
            }
          }
        } else {
          // search for matchName
          const matchName: string = areaFuncData.value
            .toString()
            .replace(/\//g, '-');
          for (const checkOdd of m.sls.filter(o => o.nm === matchName)) {
            areaFuncData.odd = checkOdd.ods[0].vl;
          }
        }
      }
    }
    return areaFuncData;
  }

  /**
   * this function return a tp correspondence value for map it on feed
   * example:
   * for feed search a winner odds and the parameter selection is Winner return 40
   *
   * @param selection is equals a Podium or SpecialBet enum key
   */
  typeSelection(selection: string): number {
    switch (selection) {
      case 'WINNER':
        return 40;
        break;
      case 'PLACED':
        return 5;
        break;
      case 'SHOW':
        return 6;
        break;
      case 'OVER':
      case 'UNDER':
        return 7;
      case 'EVEN':
      case 'ODD':
        return 8;
      case 'AO': // return the EXACTA odd
      case '1VA': // reutrn Quinella
      case 'AOX':
        return 9;
      case 'T':
      case 'TOX':
        return 12;
      default:
        return -1;
    }
  }

  private checkSmartCode(areaFuncData: PolyfunctionalArea): PolyfunctionalArea {
    this.smartCode.code = null;
    // setting the PolyfunctionalArea with only an winning selection
    if (this.smartCode.selWinner.length === 1) {
      if (
        this.smartCode.selPlaced.length === 1 &&
        this.smartCode.selPodium.length === 0
      ) {
        this.smartCode.code = SmartCodeType[SmartCodeType.AO];
      } else if (
        // if the second selectione is multiple of 1
        this.smartCode.selPlaced.length > 1 &&
        this.smartCode.selPodium.length === 0
      ) {
        this.smartCode.code = SmartCodeType[SmartCodeType['1VA']];
      } else if (
        this.smartCode.selPlaced.length === 1 &&
        this.smartCode.selPodium.length === 1
      ) {
        this.smartCode.code = SmartCodeType[SmartCodeType['T']];
        areaFuncData.value =
          this.smartCode.selWinner.join('') +
          '/' +
          this.smartCode.selPlaced.join('') +
          '/' +
          this.smartCode.selPodium.join('');
      } else if (
        this.smartCode.selPlaced.length > 0 &&
        this.smartCode.selPodium.length > 0
      ) {
        this.smartCode.code = SmartCodeType[SmartCodeType.TOX];
        areaFuncData.value =
          this.smartCode.selWinner.join('') +
          '/' +
          this.smartCode.selPlaced.join('') +
          '/' +
          this.smartCode.selPodium.join('');
      }
    } else if (this.smartCode.selWinner.length > 1) {
      if (
        this.smartCode.selPlaced.length > 0 &&
        this.smartCode.selPodium.length === 0
      ) {
        this.smartCode.code = SmartCodeType[SmartCodeType.AOX];
      } else if (
        this.smartCode.selPlaced.length > 0 &&
        this.smartCode.selPodium.length > 0
      ) {
        this.smartCode.code = SmartCodeType[SmartCodeType.TOX];
        areaFuncData.value =
          this.smartCode.selWinner.join('') +
          '/' +
          this.smartCode.selPlaced.join('') +
          '/' +
          this.smartCode.selPodium.join('');
      }
    }

    if (this.smartCode.code) {
      areaFuncData.selection = this.smartCode.code;
      if (this.smartCode.selPodium.length === 0) {
        areaFuncData.value =
          this.smartCode.selWinner.join('') +
          '/' +
          this.smartCode.selPlaced.join('');
      }
    }
    return areaFuncData;
  }

  generateOdds(value: string): string[] {
    const selections: string[] = value.split('/');
    const returnValues: string[] = [];

    if (selections.length > 0) {
      const values1: string[] = this.extractOddFromString(selections[0]);
      for (let i1 = 0; i1 < selections[0].length; i1++) {
        if (selections.length > 1) {
          const values2: string[] = this.extractOddFromString(selections[1]);
          for (let i2 = 0; i2 < selections[1].length; i2++) {
            if (selections.length > 2) {
              const values3: string[] = this.extractOddFromString(
                selections[2]
              );
              for (let i3 = 0; i3 < selections[2].length; i3++) {
                returnValues.push(
                  values1[i1] + '-' + values2[i2] + '-' + values3[i3]
                );
              }
            } else {
              returnValues.push(values1[i1] + '-' + values2[i2]);
            }
          }
        } else {
          returnValues.push(values1[i1]);
        }
      }
    }

    return returnValues;
  }

  extractOddFromString(value: string): string[] {
    const returnValues: string[] = [];
    for (let index = 0; index < value.length; index++) {
      returnValues.push(value.charAt(index));
    }
    return returnValues;
  }
}
