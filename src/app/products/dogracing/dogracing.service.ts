import { Injectable } from '@angular/core';
import { interval, Observable, Subject, timer } from 'rxjs';
import { CountDown, EventResults, Market, Race as RaceApi, SportDetail, Tournament, TreeSports } from '../../services/api/vgen.model';
import { VgenService } from '../../services/api/vgen.service';
import { BetOdd, PolyfunctionalArea } from '../products.model';
import { ProductsService } from '../products.service';
import { CombinationType, Dog, Lucky, PlacingRace, Podium, Race, RaceDetail, RaceResult, RaceTime, Smartcode, SmartCodeType, SpecialBet, SpecialBetValue, TypePlacingRace, TypeBetSlipColTot } from './dogracing.models';
import { BtncalcService } from 'src/app/component/btncalc/btncalc.service';

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
  placingRace: PlacingRace = new PlacingRace(); // place the global race
  placingRaceSubject: Subject<PlacingRace>;

  public currentRaceSubscribe: Subject<number>;
  public currentRaceObserve: Observable<number>;

  private attempts = 0;

  dogList: Dog[];
  // temp array

  smartCode: Smartcode;

  amount: number;

  constructor(
    private vgenService: VgenService,
    private productService: ProductsService,
    private btnService: BtncalcService
  ) {
    this.raceDetails = new RaceDetail();
    this.raceDetails.currentRace = 0;
    // ...da api
    this.amount = 1;

    interval(1000).subscribe(() => this.getTime());

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

    // this.btnService.selectedAmount.subscribe(amount => (this.amount = amount));
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
    try {
      if (this.remmaningTime.second === 0 && this.remmaningTime.minute === 0) {
        this.loadRaces();
        this.loadLastResult();
      } else {
        if (this.remmaningTime.second < 0 || this.remmaningTime.minute < 0) {
          // if remaining time is negative there is an error, reload all
          // console.log('::::reset');
          this.cacheRaces = null;
          this.loadRaces();
          this.loadLastResult(false);
        }
        if (this.remmaningTime.second === 0) {
          // remaing time
          this.remmaningTime.second = 59;
          this.remmaningTime.minute = this.remmaningTime.minute - 1;
          // remaing showed time
          this.raceDetails.raceTime.minute =
            this.raceDetails.raceTime.minute - 1;
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
          this.productService.timeBlockedSubscribe.next(
            this.placingRace.timeBlocked
          );
        }
        // showed second
        this.raceDetails.raceTime.second = this.remmaningTime.second;
      }
    } catch (err) {
      // console.log('catch', err);
      this.cacheRaces = null;
      this.loadRaces();
      this.loadLastResult(false);
    }
  }

  loadRaces(): void {
    // console.log('load new race');
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
      timer(10000).subscribe(() => this.getLastResult());
    } else {
      this.getLastResult();
    }
  }

  getLastResult() {
    this.listResult = [];
    timer(300).subscribe(() => {
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
    // console.log('get detail', raceNumber);
    const race: RaceApi = this.cacheRaces.filter(
      (cacheRace: RaceApi) => cacheRace.id === raceNumber
    )[0];

    // check, if is empty load from api
    if (race.mk == null || race.mk.length === 0) {
      this.vgenService
        .raceDetails(8, raceNumber)
        .then((sportDetail: SportDetail) => {
          try {
            race.mk = sportDetail.Sport.ts[0].evs[0].mk;
            race.tm = sportDetail.Sport.ts[0].evs[0].tm;
            this.attempts = 0;
          } catch (err) {
            if (this.attempts < 5) {
              this.attempts++;
              setTimeout(() => {
                this.raceDetailOdds(raceNumber);
              }, 1000);
            } else {
              this.attempts = 0;
            }
          }
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
      for (let idx = 0; idx < this.placingRace.dogs.length; idx++) {
        const item = this.placingRace.dogs[idx];
        if (item.number === dog.number && item.position === dog.position) {
          this.placingRace.dogs.splice(idx, 1);
          this.checkedIsSelected(dog, true);
          removed = true;
        }
      }
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

  typePlacing(type: TypePlacingRace) {
    if (this.placingRace.typePlace === type) {
      this.placingRace.typePlace = undefined;
      this.placingRace.thirdRowDisabled = false;
    } else {
      this.placingRace.typePlace = type;
      if (this.placingRace.typePlace !== undefined) {
        // deselect all dogs in the row #3
        this.deselectRowDogs(3);
        this.placingRace.thirdRowDisabled = true;
      } else {
        this.placingRace.thirdRowDisabled = false;
      }
    }
    this.placeOdd();
  }

  private deselectRowDogs(position: number): void {
    for (const dog of this.placingRace.dogs.filter(
      item => item.position === position
    )) {
      this.placingOdd(dog);
    }
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
   /*  areaFuncData.activeAssociationCol = false;
    areaFuncData.activeDistributionTot = false; */
    try {
      // check if is first insert
      let dogName: string;
      if (
        this.placingRace.dogs.length === 1 &&
        !this.placingRace.isSpecialBets &&
        this.placingRace.typePlace === undefined
      ) {
        // single selection
        areaFuncData.selection = Podium[this.placingRace.dogs[0].position];
        areaFuncData.value = this.placingRace.dogs[0].number;
        // match dog from object tm with mk
        dogName = odd.tm.filter(t => t.ito === areaFuncData.value)[0].nm;
      } else if (
        (this.placingRace.dogs.length > 1 && !this.placingRace.isSpecialBets) ||
        this.placingRace.typePlace
      ) {
        // composit selection
        this.placingRace.dogs.forEach(item => {
          if (item.position === 1) {
            this.smartCode.selWinner.push(item.number);
          } else if (item.position === 2) {
            this.smartCode.selPlaced.push(item.number);
          } else if (item.position === 3) {
            this.smartCode.selPodium.push(item.number);
          }
        });
        // type Place particular iterations
        if (
          this.placingRace.typePlace === TypePlacingRace.ST &&
          this.smartCode.selWinner.length > 2
        ) {
          this.placingRace.secondRowDisabled = true;
          this.deselectRowDogs(2);
        } else {
          this.placingRace.secondRowDisabled = false;
        }
      } else if (this.placingRace.isSpecialBets) {
        // specialbets OVER / UNDER / EVEN / ODD
        // setting label selection
        areaFuncData.selection = SpecialBet[this.placingRace.specialBetValue];
        areaFuncData.value = SpecialBetValue[this.placingRace.specialBetValue];
      }

      // check smartcode and extract composit bets
      areaFuncData = this.checkSmartCode(areaFuncData);
      // set amount
      areaFuncData.amount = (!this.btnService.polyfunctionalArea) ? this.amount : this.btnService.polyfunctionalArea.amount;
      // verify if the type of betslip is set
      if (this.btnService.polyfunctionalArea !== null ) {
        areaFuncData.typeSlipCol = this.btnService.polyfunctionalArea.typeSlipCol;
      } else {
        areaFuncData.typeSlipCol = TypeBetSlipColTot.COL;
      }
      // extract odds
      if (this.smartCode.code) {
        areaFuncData.selection = this.smartCode.code;
        areaFuncData = this.extractOdd(odd, areaFuncData);
      } else {
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
  public extractOdd(
    odd: RaceApi,
    areaFuncData: PolyfunctionalArea,
    dogName?: string
  ): PolyfunctionalArea {
    let oddsToSearch: string[] = [];

    switch (areaFuncData.selection) {
      case SmartCodeType[SmartCodeType['1VA']]:
      case SmartCodeType[SmartCodeType.AOX]:
        // Generate sorted combination by 2 of the selections in the rows.
        oddsToSearch = this.generateOdds(areaFuncData.value.toString(), CombinationType.By2, true);
        break;
      case SmartCodeType[SmartCodeType.AB]:
        // Generate sorted combination by 2 of the selections in the rows.
        oddsToSearch = this.generateOdds(
          areaFuncData.value.toString(),
          CombinationType.By2,
          true
        );
        break;
      case SmartCodeType[SmartCodeType.TOX]:
        // Generate sorted combination by 2 of the selections in the rows.
        oddsToSearch = this.generateOdds(areaFuncData.value.toString(), CombinationType.By3, true);
        break;
      case SmartCodeType[SmartCodeType.AR]:
        // Generate combination by 2 of the first row selections not in order.
        oddsToSearch = this.generateOddsRow(
          areaFuncData.value.toString(),
          CombinationType.By2,
          false
        );
        break;
      case SmartCodeType[SmartCodeType.AX]:
        // Generate sorted combination by 2 of the first row selections.
        oddsToSearch = this.generateOddsRow(
          areaFuncData.value.toString(),
          CombinationType.By2,
          true
        );
        break;
      case SmartCodeType[SmartCodeType.TNX]: // Trifecta
        // Generate combination by 3 of the first row selections not in order.
        oddsToSearch = this.generateOddsRow(
          areaFuncData.value.toString(),
          CombinationType.By3,
          false
        );
        break;
      case SmartCodeType[SmartCodeType.VT]: // Winning trio
        // Generate combination by 3 of the selections in the rows not in order.
        oddsToSearch = this.generateOdds(
          areaFuncData.value.toString(),
          CombinationType.By3,
          false
        );
        break;
      case SmartCodeType[SmartCodeType.AT]: // Combined trio
        // Generate combination by 3 of the selections in the rows not in order and with the first row fixed.
        oddsToSearch = this.generateOdds(
          areaFuncData.value.toString(),
          CombinationType.By3,
          false,
          true
        );
        break;
    }

    for (const m of odd.mk.filter(
      (market: Market) =>
        market.tp === this.typeSelection(areaFuncData.selection)
    )) {
      // If the selection is PODIUM, WINNER or SHOW
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
                  (areaFuncData.typeSlipCol === TypeBetSlipColTot.TOT) ?
                    areaFuncData.amount / oddsToSearch.length : areaFuncData.amount
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
        return 40; // Winner
        break;
      case 'PLACED':
        return 5; // Placed
        break;
      case 'SHOW':
        return 6; // Show
        break;
      case 'OVER':
      case 'UNDER':
        return 7; // Over/Under Pos.
      case 'EVEN':
      case 'ODD':
        return 8; // Odd/Even Pos.
      case 'AO':
      case '1VA':
      case 'AOX':
      case 'AR':
        return 9; // Exacta
      case 'T':
      case 'TOX':
      case 'TNX':
      case 'VT':
      case 'AT':
        return 12; // Trifecta
      case 'AS':
      case 'AX':
      case 'AB':
        return 11; // Quinella
      default:
        return -1;
    }
  }

  /**
   * Generate the smartcode form PolyfunctionalArea object
   * @param areaFuncData
   */
  private checkSmartCode(areaFuncData: PolyfunctionalArea): PolyfunctionalArea {
    this.smartCode.code = null;

    switch (this.placingRace.typePlace) {
      case TypePlacingRace.ACCG: // Place ACCG bet
        this.smartCode.code = this.placeTypeACCG(areaFuncData);
        break;
      case TypePlacingRace.ST: // Place ST bet
        this.smartCode.code = this.placeTypeST(areaFuncData);
        break;
      case TypePlacingRace.R: // Place R bet
        this.smartCode.code = this.placeTypeR(areaFuncData);
        break;
      default:
        // Normal bet
        // Setting the PolyfunctionalArea with only a winning selection
        if (this.smartCode.selWinner.length === 1) {
          if (
            this.smartCode.selPlaced.length === 1 &&
            this.smartCode.selPodium.length === 0
          ) {
            this.smartCode.code = SmartCodeType[SmartCodeType.AO];
          } else if (
            // The second selection is multiple of 1
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
            // Items in the first and second row
            this.smartCode.code = SmartCodeType[SmartCodeType.AOX];
          } else if (
            this.smartCode.selPlaced.length > 0 &&
            this.smartCode.selPodium.length > 0
          ) {
            // Items in all the rows
            this.smartCode.code = SmartCodeType[SmartCodeType.TOX];
            areaFuncData.value =
              this.smartCode.selWinner.join('') +
              '/' +
              this.smartCode.selPlaced.join('') +
              '/' +
              this.smartCode.selPodium.join('');
          }
        }
        if (
          this.smartCode.selPlaced.length > 0 &&
          this.smartCode.selPodium.length === 0
        ) {
          areaFuncData.value =
            this.smartCode.selWinner.join('') +
            '/' +
            this.smartCode.selPlaced.join('');
        }
    }

    return areaFuncData;
  }

  /**
   * Generate the smarcode for ACCG form PolyfunctionalArea object
   * @param areaFuncData PolyfunctionalArea object
   */
  private placeTypeACCG(areaFuncData: PolyfunctionalArea): string {
    // One or more selections on the first row
    if (this.smartCode.selWinner.length >= 1) {
      if (
        this.smartCode.selPlaced.length === 0 &&
        this.smartCode.selPodium.length === 0
      ) {
        // only selections in the first row
        if (this.smartCode.selWinner.length === 2) {
          // Single
          // Sort the displayed values
          this.smartCode.selWinner.sort(function(a, b) {
            return a - b;
          });
          areaFuncData.value = this.smartCode.selWinner.join('-');
          return SmartCodeType[SmartCodeType.AS];
        } else if (this.smartCode.selWinner.length > 2) {
          // Multiple
          this.smartCode.selWinner.sort(function(a, b) {
            return a - b;
          });
          areaFuncData.value = this.smartCode.selWinner.join('');
          return SmartCodeType[SmartCodeType.AX];
        }
      } else if (
        this.smartCode.selPlaced.length > 0 &&
        this.smartCode.selPodium.length === 0
      ) {
        // Selections in the first and second row
        if (
          this.smartCode.selWinner.length === 1 &&
          this.smartCode.selPlaced.length === 1
        ) {
          // Only a dog is selected on the first and second row the result is a single "Combination".
          // Sort the selections
          if (this.smartCode.selWinner[0] > this.smartCode.selPlaced[0]) {
            areaFuncData.value =
              this.smartCode.selPlaced[0] + '-' + this.smartCode.selWinner[0];
          } else {
            areaFuncData.value =
              this.smartCode.selWinner[0] + '-' + this.smartCode.selPlaced[0];
          }
          return SmartCodeType[SmartCodeType.AS];
        } else {
          // Combination with base and tail
          // Sort the displayed values
          this.smartCode.selWinner.sort(function(a, b) {
            return a - b;
          });
          this.smartCode.selPlaced.sort(function(a, b) {
            return a - b;
          });
          areaFuncData.value =
            this.smartCode.selWinner.join('') +
            '/' +
            this.smartCode.selPlaced.join('');
          return SmartCodeType[SmartCodeType.AB];
        }
      }
      return null;
    }
  }

  /**
   * Smarcode generator for ST form PolyfunctionalArea object
   * @param areaFuncData PolyfunctionalArea object.
   * @returns Generated smartcode.
   */
  private placeTypeST(areaFuncData: PolyfunctionalArea): string {
    // One or more selections on the first row
    if (this.smartCode.selWinner.length >= 1) {
      // Only selections in the first row
      if (
        this.smartCode.selPlaced.length === 0 &&
        this.smartCode.selPodium.length === 0
      ) {
        // Requirements "Trio a girare"
        if (this.smartCode.selWinner.length >= 3) {
          // Sort the displayed values
          this.smartCode.selWinner.sort(function(a, b) {
            return a - b;
          });
          areaFuncData.value = this.smartCode.selWinner.join('');
          return SmartCodeType[SmartCodeType.TNX];
        }
      } else if (
        this.smartCode.selPlaced.length > 0 &&
        this.smartCode.selPodium.length === 0
      ) {
        // Sections in the first and second row.
        if (this.smartCode.selWinner.length === 1) {
          // Requirements "Vincente Trio"
          // Enough selections on the second row to be able to create a trio
          if (this.smartCode.selPlaced.length >= 2) {
            // Sort the displayed values
            this.smartCode.selPlaced.sort(function(a, b) {
              return a - b;
            });
            areaFuncData.value =
              this.smartCode.selWinner[0] +
              '/' +
              this.smartCode.selPlaced.join('');
            return SmartCodeType[SmartCodeType.VT];
          }
        } else if (this.smartCode.selWinner.length === 2) {
          // Requirements "Accoppiata Trio"
          // Enough selections on the second row to be able to create a trio
          if (this.smartCode.selPlaced.length >= 1) {
            // Sort the displayed values
            this.smartCode.selWinner.sort(function(a, b) {
              return a - b;
            });
            if (this.smartCode.selPlaced.length > 1) {
              // Sort the displayed values
              this.smartCode.selPlaced.sort(function(a, b) {
                return a - b;
              });
            }
            areaFuncData.value =
              this.smartCode.selWinner.join('') +
              '/' +
              this.smartCode.selPlaced.join('');
            return SmartCodeType[SmartCodeType.AT];
          }
        }
      }
    }
    return null;
  }

  /**
   * Smarcode generator for R form PolyfunctionalArea object
   * @param areaFuncData PolyfunctionalArea object.
   * @returns Generated smartcode.
   */
  private placeTypeR(areaFuncData: PolyfunctionalArea): string {
    // One or more selections on the first row
    if (this.smartCode.selWinner.length >= 1) {
      // Only selections in the first row
      if (
        this.smartCode.selPlaced.length === 0 &&
        this.smartCode.selPodium.length === 0
      ) {
        // Requirements "Accoppiata in ordine con ritorno"
        if (this.smartCode.selWinner.length === 2) {
          // Sort the displayed values
          this.smartCode.selWinner.sort(function(a, b) {
            return a - b;
          });
          areaFuncData.value = this.smartCode.selWinner.join('');
          return SmartCodeType[SmartCodeType.AR];
        }
      } else if (
        this.smartCode.selPlaced.length > 0 &&
        this.smartCode.selPodium.length === 0
      ) {
        // Selections in the first and second row
      }
    }
    return null;
  }

  // tslint:disable:max-line-length
  /**
   * Generate all combinations of bets from all the rows selections
   * @param value String representations. Ex. 12/34/56, 12/345
   * @param combinationType Enum (CombinationType) of the type of combination desired. Values: By2, By3.
   * @param ordered Boolean to determin if the combinations have to be in order or not. Ex: false (combination 1-3-5, 3-1-5, 5-1-3, 5-3-1 are all valid), true (only combination 1-3-5 is valid).
   * @param isFirstRowFixed When "true" the selections from the first row have to be always present on the combinations. Valid only in combination by 3. Value: true (the first row is fixed), false or not indicated (The second row is the fixed one).
   *  Ex:
   *    - value = 12/34, combinationType = By3, ordered = false, isFirstRowFixed = true -> result = 1-2-3, 1-2-4, 2-1-3, 2-1-4
   *    - value = 12/34, combinationType = By3, ordered = false, isFirstRowFixed = false or not indicated -> result = 1-3-4, 1-4-3, 2-3-4, 2-4-3
   * @returns Array of combinations. Ex: For type "By2" in order: 1-3-5, 1-3-6, 1-4-6, 2-3-5, 2-3-6, 2-4-5, 2-4-6. For type "By3" not in order: 1-3-4, 3-1-4, 3-4-1, 4-1-3, 4-3-1, 1-4-5 ecc.
   */
  // tslint:enable:max-line-length
  generateOdds(
    value: string,
    combinationType: CombinationType,
    ordered: boolean,
    isFirstRowFixed?: boolean
  ): string[] {
    const selections: string[] = value.split('/');
    const returnValues: string[] = [];

    if (selections.length > 0) {
      // Extraction of the selections in the first row.
      const values1: string[] = this.extractOddFromString(selections[0]);
      for (let i1 = 0; i1 < selections[0].length; i1++) {
        if (selections.length > 1) {
          // Extraction of the selections in the second row.
          const values2: string[] = this.extractOddFromString(selections[1]);
          switch (combinationType) {
            case CombinationType.By2: // Combination of the selections By 2
              for (let i2 = 0; i2 < selections[1].length; i2++) {
                if (ordered) {
                  // Sort the combination
                  if (parseInt(values1[i1], 10) > parseInt(values2[i2], 10)) {
                    returnValues.push(values2[i2] + '-' + values1[i1]);
                  } else {
                    returnValues.push(values1[i1] + '-' + values2[i2]);
                  }
                } else {
                  returnValues.push(values1[i1] + '-' + values2[i2]);
                  returnValues.push(values2[i2] + '-' + values1[i1]);
                }
              }
              break;
            case CombinationType.By3: // Combination of the selections By 3
              // The first row is the fixed one and there are enough selections to create a trio
              if (isFirstRowFixed && selections.length === 2) {
                for (let i1b = i1 + 1; i1b < selections[0].length; i1b++) {
                  for (let i2 = 0; i2 < selections[1].length; i2++) {
                    returnValues.push(
                      values1[i1] + '-' + values1[i1b] + '-' + values2[i2]
                    );
                    if (!ordered) {
                      returnValues.push(
                        values1[i1b] + '-' + values1[i1] + '-' + values2[i2]
                      );
                    }
                  }
                }
              } else {
                for (let i2 = 0; i2 < selections[1].length; i2++) {
                  // Selections on the first and second row.
                  if (selections.length === 2) {
                    // There are enough selections on the second row to make a trio.
                    if (selections[1].length >= 2) {
                      for (
                        let i2b = i2 + 1;
                        i2b < selections[1].length;
                        i2b++
                      ) {
                        if (ordered) {
                          // Sort the combination
                          if (
                            parseInt(values2[i2], 10) >=
                            parseInt(values2[i2b], 10)
                          ) {
                            returnValues.push(
                              values1[i1] +
                                '-' +
                                values2[i2b] +
                                '-' +
                                values2[i2]
                            );
                          } else {
                            returnValues.push(
                              values1[i1] +
                                '-' +
                                values2[i2] +
                                '-' +
                                values2[i2b]
                            );
                          }
                        } else {
                          returnValues.push(
                            values1[i1] + '-' + values2[i2] + '-' + values2[i2b]
                          );
                          returnValues.push(
                            values1[i1] + '-' + values2[i2b] + '-' + values2[i2]
                          );
                        }
                      }
                    }
                  } else if (selections.length > 2) {
                    // Selections on all three rows.
                    // Extraction of the selections in the third row.
                    const values3: string[] = this.extractOddFromString(
                      selections[2]
                    );
                    for (let i3 = 0; i3 < selections[2].length; i3++) {
                      returnValues.push(
                        values1[i1] + '-' + values2[i2] + '-' + values3[i3]
                      );
                    }
                  }
                }
              }
              break;
          }
        } else {
          returnValues.push(values1[i1]);
        }
      }
    }

    return returnValues;
  }

  // tslint:disable:max-line-length
  /**
   * Generate all combinations of bets from a single row selections
   * @param value String representations, ex. 1234
   * @param combinationType Enum (CombinationType) of the type of combination desired. Values: By2 (combination by 2), By3 (combination by 3).
   * @param ordered Boolean to determin if the combinations have to be in order or not. Ex: false (combination 1-2 and 2-1 are both valid), true (only combination 1-2 is valid).
   * @returns Array of combinations. Ex: For type "By2": 1-2, 1-3, 1-4, 2-3, 2-4, 3-4. For type "By3": 1-2-3, 1-3-4, 1-2-4, 2-1-3, 2-3-4, ecc.
   */
  // tslint:enable:max-line-length
  generateOddsRow(
    value: string,
    combinationType: CombinationType,
    ordered: boolean
  ): string[] {
    const returnValues: string[] = [];

    if (value.length > 0) {
      // Extraction of the selections in the row.
      const values: string[] = this.extractOddFromString(value);
      for (let i = 0; i < value.length; i++) {
        for (let j = i + 1; j < value.length; j++) {
          switch (combinationType) {
            case CombinationType.By2: // Combination of the selections By 2
              if (ordered) {
                returnValues.push(values[i] + '-' + values[j]);
              } else {
                returnValues.push(values[i] + '-' + values[j]);
                returnValues.push(values[j] + '-' + values[i]);
              }
              break;
            case CombinationType.By3: // Combination of the selections By 3
              for (let k = j + 1; k < value.length; k++) {
                if (ordered) {
                  returnValues.push(
                    values[i] + '-' + values[j] + '-' + values[k]
                  );
                } else {
                  returnValues.push(
                    values[i] + '-' + values[j] + '-' + values[k]
                  );
                  returnValues.push(
                    values[i] + '-' + values[k] + '-' + values[j]
                  );
                  returnValues.push(
                    values[j] + '-' + values[i] + '-' + values[k]
                  );
                  returnValues.push(
                    values[j] + '-' + values[k] + '-' + values[i]
                  );
                  returnValues.push(
                    values[k] + '-' + values[i] + '-' + values[j]
                  );
                  returnValues.push(
                    values[k] + '-' + values[j] + '-' + values[i]
                  );
                }
              }
              break;
          }
        }
      }
    }

    return returnValues;
  }

  /**
   * Method to extract the selection form the smarcode
   * @param value Smartcode section from where extract the selections.
   */
  extractOddFromString(value: string): string[] {
    const returnValues: string[] = [];
    for (let index = 0; index < value.length; index++) {
      returnValues.push(value.charAt(index));
    }
    return returnValues;
  }
}
