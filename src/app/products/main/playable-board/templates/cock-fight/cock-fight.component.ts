import { Component, Input, OnDestroy } from '@angular/core';
import { MainService } from '../../../main.service';
import { VirtualBetEvent, VirtualBetSelection } from '@elys/elys-api';
import { Subscription, timer } from 'rxjs';
import { Market } from '../../../../../products/products.model';
import { SpecialBet } from '../../../main.models';
import { ProductsService } from '../../../../../products/products.service';

@Component({
  selector: 'app-playable-board-cock-fight',
  templateUrl: './cock-fight.component.html',
  styleUrls: ['./cock-fight.component.scss']
})
export class CockFightComponent implements OnDestroy {
  @Input()
  public rowHeight: number;
  public eventDetails: VirtualBetEvent;
  public marketEnum: typeof Market = Market;
  public specialBet: typeof SpecialBet = SpecialBet;
  // List of visible markets on the template. The index of the array is taken to show them on the different rows of the template.
  public shownMarkets: Market[];
  private currentEventSubscription: Subscription;
  // List of odds selected.
  public oddsSelected: number[];

  constructor(public mainService: MainService, public productService: ProductsService) {
    this.oddsSelected = [];
    // Get the setting information on the order to show the market on the template.
    this.shownMarkets = this.productService.product.layoutProducts.shownMarkets;

    // Get the event's details.
    this.currentEventSubscription = this.mainService.currentEventObserve.subscribe(() => {
      this.getEventDetails();
    });

    // Get the change of the polyfunctional area's object.
    this.productService.polyfunctionalAreaSubject.subscribe(polyfunctional => {
      // Delete the list of selections when the object of polyfunctional area is empty.
      if (polyfunctional.odds.length === 0 && this.oddsSelected.length !== 0) {
        this.oddsSelected = [];
      }
    });
  }

  ngOnDestroy() {
    this.currentEventSubscription.unsubscribe();
  }

  /**
   * Method to get the details of the currently selected event.
   * @param attemptsNumber The number of attempted call executed. Limit of attempts is 5 recall.
   */
  getEventDetails(attemptsNumber: number = 0) {
    this.mainService
      .getCurrentEvent()
      .then(eventDetails => {
        this.eventDetails = eventDetails;
      })
      .catch(error => {
        // Limit of attempts is 5 recall.
        if (attemptsNumber < 5) {
          timer(1000).subscribe(() => this.getEventDetails(attemptsNumber + 1));
        } else {
          console.log(error);
        }
      });
  }

  selectOdd(marketId: number, selection: VirtualBetSelection) {
    const index = this.oddsSelected.indexOf(selection.id);
    // Insert or delete the selection from the list.
    if (index === -1) {
      this.oddsSelected.push(selection.id);
    } else {
      this.oddsSelected.splice(index, 1);
    }
    this.mainService.placingOddByOdd(marketId, selection);
  }
}
