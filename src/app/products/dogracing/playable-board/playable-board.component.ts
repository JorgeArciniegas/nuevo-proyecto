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

  placingRace: PlacingRace; // place the global race

  specialBet: typeof SpecialBet = SpecialBet;

  currentRaceSubscription: Subscription;

  constructor(public service: DogracingService) {}

  ngOnInit() {
    this.placingRace = new PlacingRace();
    this.placingRace.raceNumber = this.service.raceDetails.races[0].number;
    this.currentRaceSubscription = this.service.currentRaceObserve.subscribe(
      raceIndex =>
        (this.placingRace.raceNumber = this.service.raceDetails.races[
          raceIndex
        ].number)
    );
  }

  ngOnDestroy(): void {
    this.currentRaceSubscription.unsubscribe();
  }

  dogplaced(dog: Dog): void {
    let removed: boolean;

    if (!this.placingRace) {
      this.placingRace.raceNumber = this.service.raceDetails.races[
        this.service.raceDetails.currentRace
      ].number;
    }
    dog.actived = true;

    if (this.placingRace.dogs.length === 0) {
      this.placingRace.dogs.push(dog);
      this.checkedIsSelected(dog);
    } else {
      this.placingRace.dogs.filter((item, idx) => {
        if (item.number === dog.number && item.position === item.position) {
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
    console.log(this.placingRace);
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
      this.placingRace.isSpecialBets &&
      this.specialBet[type] === this.placingRace.specialBetValue
    ) {
      this.placingRace.isSpecialBets = false;
      this.placingRace.specialBetValue = null;

      return;
    }

    this.placingRace.isSpecialBets = true;
    this.placingRace.specialBetValue = this.specialBet[type];

    console.log(this.placingRace, this.specialBet[type]);
  }
}
