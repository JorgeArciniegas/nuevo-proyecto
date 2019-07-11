import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { MainService } from '../../../main.service';
import { VirtualBetEvent } from '@elys/elys-api';
import { Subscription } from 'rxjs';
import { COCK_MARKET } from 'src/app/products/products.model';
import { SpecialBet } from '../../../main.models';

@Component({
  selector: 'app-playable-board-cock-fight',
  templateUrl: './cock-fight.component.html',
  styleUrls: ['./cock-fight.component.scss']
})
export class CockFightComponent implements AfterViewInit, OnDestroy {
  @Input()
  public rowHeight: number;
  public eventDetails: VirtualBetEvent;
  public cockMarket: typeof COCK_MARKET = COCK_MARKET;
  public specialBet: typeof SpecialBet = SpecialBet;
  // List of visible markets on the template. The index of the array is taken to show them on the different rows of the template.
  public shownMarkets: COCK_MARKET[] = [
    COCK_MARKET['1X2'],
    COCK_MARKET['1X2OverUnder'],
    COCK_MARKET['1X2WinningSector'],
    COCK_MARKET['WinningSector']
  ];
  private currentEventSubscription: Subscription;

  constructor(public mainService: MainService) {
    // Get the event's details
    this.eventDetails = this.mainService.getCurrentRace();

    this.currentEventSubscription = this.mainService.currentEventObserve.subscribe(() => {
      this.eventDetails = this.mainService.getCurrentRace();
    });
    console.log(this.eventDetails);
  }

  ngAfterViewInit() {
    // Get the event's details
    // this.eventDetails = this.mainService.getCurrentRace();
    // this.currentEventSubscription = this.mainService.currentEventObserve.subscribe(() => {
    //   console.log('Sono qui!');
    //   this.eventDetails = this.mainService.getCurrentRace();
    // });
    // console.log(this.eventDetails);
  }

  ngOnDestroy() {
    this.currentEventSubscription.unsubscribe();
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
