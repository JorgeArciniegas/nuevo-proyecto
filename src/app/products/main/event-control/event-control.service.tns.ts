import { Injectable, OnDestroy } from '@angular/core';
import { LAYOUT_TYPE } from '../../../../environments/environment.models';
import { MainService } from '../main.service';
import { EventControl } from './event-control.model';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../products.service';
import { Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventControlService {
  public eventsControlDetails: EventControl;
  private currentEventSubscription: Subscription;
  private remaingTimeCounterSubscription: Subscription;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  private settings: AppSettings;
  public eventControlDetails: EventControl;
  constructor(
    public mainService: MainService,
    private readonly appSettings: AppSettings,
    public productService: ProductsService
  ) {
    this.settings = this.appSettings;
  }

  init() {
    this.currentEventSubscription = this.mainService.currentEventSubscribe.subscribe(
      event => {
        // Reset polling on timer when event changes
        // check if timer subscriptions exist, if so unsubscribe them.
        if (this.remaingTimeCounterSubscription) {
          this.remaingTimeCounterSubscription.unsubscribe();
        }
        /**
         * @eventControlDetails is passed as input to a control template
         */
        this.eventControlDetails = this.getEventControl();
      }
    );
    // when app to start check if the subscription is enabled
    if (!this.eventControlDetails) {
      this.eventControlDetails = this.getEventControl();
    }
  }

  destroy() {
    this.currentEventSubscription.unsubscribe();
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
      currentEvent: this.mainService.eventDetails.events[this.mainService.eventDetails.currentEvent],
      eventLabel: this.mainService.eventDetails.events[this.mainService.eventDetails.currentEvent].label,
      eventNumber: this.mainService.eventDetails.events[this.mainService.eventDetails.currentEvent].number,
      showEventId: this.settings.showEventId,
      isWindowSizeSmall: this.productService.windowSize.small,
      theme: this.settings.theme
    };
    this.remaingTimeCounterSubscription = this.mainService.remaingTimeCounterObs.subscribe(timerEvent => {
      this.eventsControlDetails.eventTimeMinutes = timerEvent.minute;
      this.eventsControlDetails.eventTimeSeconds = timerEvent.second;
    });

    return this.eventsControlDetails;
  }

}
