import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LAYOUT_RESULT_LIST_TYPE } from '../../../../../src/environments/environment.models';
import { ProductsService } from '../../products.service';
import { SpecialBet, TypePlacingRace } from '../main.models';

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
  public typeLayout: typeof LAYOUT_RESULT_LIST_TYPE = LAYOUT_RESULT_LIST_TYPE;
  constructor(public productService: ProductsService) { }

  ngOnInit() {
   /*  this.currentRaceSubscription = this.service.currentEventObserve.subscribe(
      raceIndex =>
        (this.service.placingRace.raceNumber = this.service.raceDetails.races[
          raceIndex
        ].number)
    ); */
  }

  ngOnDestroy(): void {
    // this.currentRaceSubscription.unsubscribe();
  }
  /*
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
  } */
}
