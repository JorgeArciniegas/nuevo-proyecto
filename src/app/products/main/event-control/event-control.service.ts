import { Injectable, OnDestroy } from '@angular/core';
import { LAYOUT_TYPE } from '../../../../../src/environments/environment.models';
import { MainService } from '../main.service';
import { EventControl } from './event-control.model';
import { AppSettings } from '../../../../../src/app/app.settings';
import { ProductsService } from '../../products.service';
import { Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventControlService {
  public eventsControlDetails: EventControl;
  private currentEventSubscription: Subscription;
  private currentMinuteSubscription: Subscription;
  private currentSecondSubscription: Subscription;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  private settings: AppSettings;
  public eventControlDetails: EventControl;
  constructor(
    public mainService: MainService,
    private readonly appSettings: AppSettings,
    public productService: ProductsService
  ) {
    this.settings = this.appSettings;
    this.currentEventSubscription = this.mainService.currentEventSubscribe.subscribe(
      event => {
        // Reset polling on timer when event changes
        // check if timer subscriptions exist, if so unsubscribe them.
        if (this.currentMinuteSubscription && this.currentSecondSubscription) {
          this.timerUnsubscribe();
        }
        /**
         * @eventControlDetails is passed as input to a control template
         */
        this.eventControlDetails = this.getEventControl();
      }
    );
  }
  /**
   * @getEventControl thrown on each event change
   * @returns event info object
   */
  public getEventControl(): EventControl {
    // Create layout object
    this.eventsControlDetails = {
      productImageClass: this.productService.product.productSelected
        ? 'PRODUCT-' + this.productService.product.codeProduct + '-BG'
        : '',
      productName: this.productService.product.label,
      currentEvent: this.mainService.eventDetails.events[
        this.mainService.eventDetails.currentEvent
      ],
      eventLabel: this.mainService.eventDetails.events[
        this.mainService.eventDetails.currentEvent
      ].label,
      eventNumber: this.mainService.eventDetails.events[
        this.mainService.eventDetails.currentEvent
      ].number,
      showEventId: this.settings.showEventId,
      isWindowSizeSmall: this.productService.windowSize.small,
      theme: this.settings.theme
    };

    this.getMinutes();
    this.getSeconds();
    return this.eventsControlDetails;
  }
  // polling on event minutes count down and update eventsControlDetails.eventTimeMinutes
  public getMinutes(): void {
    this.currentMinuteSubscription = timer(0, 100).subscribe(val => {
      this.eventsControlDetails.eventTimeMinutes = this.mainService.eventDetails.eventTime.minute;
    });
  }
  // polling on event seconds count down and update eventsControlDetails.eventTimeSeconds
  public getSeconds(): void {
    this.currentSecondSubscription = timer(0, 100).subscribe(val => {
      this.eventsControlDetails.eventTimeSeconds = this.mainService.eventDetails.eventTime.second;
    });
  }
  timerUnsubscribe() {
    this.currentMinuteSubscription.unsubscribe();
    this.currentSecondSubscription.unsubscribe();
  }
}
