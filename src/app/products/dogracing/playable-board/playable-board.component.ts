import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Dog,
  PlacingRace,
  SpecialBet,
  TypePlacingRace
} from '../dogracing.models';
import { DogracingService } from '../dogracing.service';

@Component({
  selector: 'app-playable-board',
  templateUrl: './playable-board.component.html',
  styleUrls: ['./playable-board.component.scss']
})
export class PlayableBoardComponent implements OnInit, OnDestroy {
  @Input()
  public rowHeight: number;
  @Input()
  public show?: boolean;

  public specialBet: typeof SpecialBet = SpecialBet;
  private currentRaceSubscription: Subscription;

  public TypePlacingRace = TypePlacingRace;
  public playableTitle: string[];

  constructor(public service: DogracingService) { }

  ngOnInit() {
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
    this.service.placingOdd(dog);
  }

  specialBets(type: string): void {
    if (this.service.placingRace.dogs.length > 0) {
      this.service.resetPlayRacing();
    }
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
  }

  setRepeat(repeat: number): void {
    this.service.placingRace.repeat = repeat;
  }
}
