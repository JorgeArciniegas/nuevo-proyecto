import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dog, PlacingRace, SpecialBet } from '../dogracing.models';
import { DogracingService } from '../dogracing.service';

@Component({
  selector: 'app-playable-board',
  templateUrl: './playable-board.component.html',
  styleUrls: ['./playable-board.component.scss']
})
export class PlayableBoardComponent implements OnInit, OnDestroy {
  @Input()
  rowHeight: number;

  specialBet: typeof SpecialBet = SpecialBet;

  currentRaceSubscription: Subscription;

  constructor(public service: DogracingService) {}

  ngOnInit() {
    this.service.placingRace = new PlacingRace();
    this.currentRaceSubscription = this.service.currentRaceObserve.subscribe(
      raceIndex =>
        (this.service.placingRace.raceNumber = this.service.raceDetails.races[
          raceIndex
        ].number)
    );
  }

  ngOnDestroy(): void {
    this.currentRaceSubscription.unsubscribe();
  }

  dogplaced(dog: Dog): void {
    let removed: boolean;

    if (!this.service.placingRace) {
      this.service.placingRace.raceNumber = this.service.raceDetails.races[
        this.service.raceDetails.currentRace
      ].number;
    }
    dog.actived = true;

    if (this.service.placingRace.dogs.length === 0) {
      this.service.placingRace.dogs.push(dog);
      this.checkedIsSelected(dog);
    } else {
      this.service.placingRace.dogs.filter((item, idx) => {
        if (item.number === dog.number && item.position === item.position) {
          this.service.placingRace.dogs.splice(idx, 1);
          this.checkedIsSelected(dog, true);
          removed = true;
        }
      });
      if (!removed) {
        this.service.placingRace.dogs.push(dog);
        this.checkedIsSelected(dog);
      }
    }
    this.service.placeOdd();
  }

  checkedIsSelected(dog: Dog, reset: boolean = false): void {
    this.service.dogList.forEach((d: Dog) => {
      if (d.number === dog.number && d.position !== dog.position && !reset) {
        d.selectable = false;
      } else if (d.number === dog.number && reset) {
        d.selectable = true;
        d.actived = false;
      }
    });
  }

  specialBets(type: string): void {
    if (
      this.service.placingRace.isSpecialBets &&
      this.specialBet[type] === this.service.placingRace.specialBetValue
    ) {
      this.service.placingRace.isSpecialBets = false;
      this.service.placingRace.specialBetValue = null;
    } else {
      this.service.placingRace.isSpecialBets = true;
      this.service.placingRace.specialBetValue = this.specialBet[type];
    }

    this.service.placeOdd();
    //placeOdd();
  }

  setRepeat(repeat: number): void {
    this.service.placingRace.repeat = repeat;
  }
}
