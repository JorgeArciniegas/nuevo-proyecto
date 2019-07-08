import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TypePlacingEvent, Player, SpecialBet } from '../../../main.models';
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

  public TypePlacingRace = TypePlacingEvent;
  public specialBet: typeof SpecialBet = SpecialBet;

  // Listen to the race selection
  private currentEventSubscription: Subscription;
  private currentProductSelection: Subscription;
  // code of product. it's used for change the layout color to buttons
  codeProduct: string;
  constructor(
    public service: MainService,
    private productService: ProductsService
  ) {
    this.currentEventSubscription = this.service.currentEventObserve.subscribe(
      raceIndex =>
        (this.service.placingEvent.eventNumber = this.service.eventDetails.events[
          raceIndex
        ].number)
    );
    this.currentProductSelection = productService.productNameSelectedObserve.subscribe(
      () => {
        this.codeProduct = productService.product.codeProduct;
      }
    );
  }

  ngOnInit() {
    this.codeProduct = this.productService.product.codeProduct;
  }

  ngOnDestroy(): void {
    this.currentEventSubscription.unsubscribe();
    this.currentProductSelection.unsubscribe();
  }

  /**
   *
   * @param runnner
   */
  runnerplaced(runnner: Player): void {
    this.service.placingOdd(runnner);
  }

  /**
   *
   * @param type
   */
  specialBets(type: string): void {
    if (this.service.placingEvent.players.length > 0) {
      this.service.resetPlayEvent();
    }
    if (
      this.service.placingEvent.isSpecialBets &&
      this.specialBet[type] === this.service.placingEvent.specialBetValue
    ) {
      this.service.placingEvent.isSpecialBets = false;
      this.service.placingEvent.specialBetValue = null;
    } else {
      this.service.placingEvent.isSpecialBets = true;
      this.service.placingEvent.specialBetValue = this.specialBet[type];
    }
    this.service.placeOdd();
  }
}
