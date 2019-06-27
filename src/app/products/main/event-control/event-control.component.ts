import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventControlService } from './event-control.service';
import { EventControl } from './event-control.model';
import { MainService } from '../main.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-event-control',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent implements OnInit, OnDestroy {
  public eventControlDetails: EventControl;
  //  private currentEventSubscription: Subscription;
  constructor(
    private eventControlService: EventControlService,
    private mainService: MainService,
    public productService: ProductsService
  ) {
    // this.currentEventSubscription = this.mainService.currentEventSubscribe.subscribe(
    //   event => {
    //     /**
    //      * @eventsDetails is passed as input to a control template
    //      */
    //     this.eventControlDetails = this.eventControlService.getEventControl();
    //     (this.eventControlDetails.eventTimeMinutes = this.mainService.raceDetails.raceTime.minute),
    //       (this.eventControlDetails.eventTimeSeconds = this.mainService.raceDetails.raceTime.second);
    //     console.log(this.eventControlDetails);
    //   }
    // );
  }

  ngOnInit() {}
  ngOnDestroy() {
    // this.currentEventSubscription.unsubscribe();
    this.eventControlService.customUnsubscribe();
  }
}
