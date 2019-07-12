import { Component, OnInit, Input, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MainService } from '../../../main.service';
import { VirtualBetEvent } from '@elys/elys-api';
import { Subscription, timer } from 'rxjs';
import { CockMarket } from 'src/app/products/products.model';
import { SpecialBet } from '../../../main.models';

@Component({
  selector: 'app-playable-board-cock-fight',
  templateUrl: './cock-fight.component.html',
  styleUrls: ['./cock-fight.component.scss']
})
export class CockFightComponent implements OnDestroy {
  @Input()
  public rowHeight: number;
  public eventDetails: VirtualBetEvent;
  public cockMarket: typeof CockMarket = CockMarket;
  public specialBet: typeof SpecialBet = SpecialBet;
  // List of visible markets on the template. The index of the array is taken to show them on the different rows of the template.
  public shownMarkets: CockMarket[] = [
    CockMarket['1X2'],
    CockMarket['1X2OverUnder'],
    CockMarket['1X2WinningSector'],
    CockMarket['WinningSector']
  ];
  private currentEventSubscription: Subscription;

  constructor(public mainService: MainService) {
    // Get the event's details
    // this.getEventDetails();

    this.currentEventSubscription = this.mainService.currentEventObserve.subscribe(() => {
      this.getEventDetails();
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
        console.log(this.eventDetails, attemptsNumber);
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

  /**
   *
   * @param type
   */
  specialBets(type: string): void {
    if (this.mainService.placingEvent.players.length > 0) {
      this.mainService.resetPlayEvent();
    }
    if (this.mainService.placingEvent.isSpecialBets && this.specialBet[type] === this.mainService.placingEvent.specialBetValue) {
      this.mainService.placingEvent.isSpecialBets = false;
      this.mainService.placingEvent.specialBetValue = null;
    } else {
      this.mainService.placingEvent.isSpecialBets = true;
      this.mainService.placingEvent.specialBetValue = this.specialBet[type];
    }
    this.mainService.placeOdd();
  }
}
