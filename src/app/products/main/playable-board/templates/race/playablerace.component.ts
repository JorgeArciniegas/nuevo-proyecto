import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TypePlacingRace, Dog, SpecialBet } from '../../../main.models';
import { MainService } from '../../../main.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../../../../../src/app/products/products.service';

@Component({
  selector: 'app-playable-race',
  templateUrl: './playablerace.component.html',
  styleUrls: ['./playablerace.component.scss']
})
export class PlayableRaceComponent implements OnInit, OnDestroy {

  @Input()
  public rowHeight: number;
  @Input()
  public show?: boolean;

  public TypePlacingRace = TypePlacingRace;
  public specialBet: typeof SpecialBet = SpecialBet;

  // Listen to the race selection
  private currentRaceSubscription: Subscription;
  private currentProductSelection: Subscription;
  // code of product. it's used for change the layout color to buttons
  codeProduct: string;
  constructor(public service: MainService, private productService: ProductsService) {
    this.currentRaceSubscription = this.service.currentEventObserve.subscribe(
      raceIndex =>
        (this.service.placingRace.raceNumber = this.service.raceDetails.races[
          raceIndex
        ].number)
    );

    this.currentProductSelection = productService.productNameSelectedObserve.subscribe( () => {
      this.codeProduct  = productService.product.codeProduct;
    });

  }

  ngOnInit() {
    this.codeProduct  = this.productService.product.codeProduct;
  }

  ngOnDestroy(): void {
    this.currentRaceSubscription.unsubscribe();
    this.currentProductSelection.unsubscribe();
  }

  /**
   *
   * @param dog
   */
  dogplaced(dog: Dog): void {
    this.service.placingOdd(dog);
  }


  /**
   *
   * @param type
   */
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

}
