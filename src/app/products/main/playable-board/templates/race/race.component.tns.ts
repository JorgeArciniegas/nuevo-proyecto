import { Component, Input, OnDestroy, OnInit, ɵConsole, AfterViewInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { UserService } from '../../../../../services/user.service';
import { LoaderService } from '../../../../../services/utility/loader/loader.service';
import { RouterService } from '../../../../../services/utility/router/router.service';
import { ProductsService } from '../../../../products.service';
import { Player, SpecialBet, TypePlacingEvent } from '../../../main.models';
import { MainService } from '../../../main.service';

@Component({
  selector: 'app-playable-board-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit, AfterViewInit, OnDestroy {
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
    private productService: ProductsService,
    private userService: UserService,
    private loaderService: LoaderService,
    private router: RouterService) {
    this.currentEventSubscription = this.service.currentEventObserve.subscribe(
      raceIndex => (this.service.placingEvent.eventNumber = this.service.eventDetails.events[raceIndex].number)
    );
    this.currentProductSelection = productService.productNameSelectedObserve.subscribe(() => {
      this.codeProduct = productService.product.codeProduct;
    });
  }

  ngOnInit() {
    this.codeProduct = this.productService.product.codeProduct;

  }

  ngAfterViewInit() {
    if (this.router.productSameReload) {
      console.log('RaceComponent', this.router.productSameReload);
      this.router.productSameReload = false;
      // it's required for disable the spinner is loading when the product selected is same to product menu touched.
      timer(500).subscribe(() => this.loaderService.setLoading(false, null));

    }
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
    if (this.service.placingEvent.isSpecialBets && this.specialBet[type] === this.service.placingEvent.specialBetValue) {
      this.service.placingEvent.isSpecialBets = false;
      this.service.placingEvent.specialBetValue = null;
    } else {
      this.service.placingEvent.isSpecialBets = true;
      this.service.placingEvent.specialBetValue = this.specialBet[type];
    }
    this.service.placeOdd();
  }
}
