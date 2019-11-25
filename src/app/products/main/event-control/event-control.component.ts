import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../products.service';
import { MainService } from '../main.service';
import { EventControl } from './event-control.model';
import { Subscription, timer } from 'rxjs';
import { LAYOUT_TYPE, Products } from '../../../../environments/environment.models';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-event-control',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent implements AfterViewInit, OnDestroy {
  private currentEventSubscription: Subscription;
  private remaingTimeCounterSubscription: Subscription;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  private settings: AppSettings;
  public eventControlDetails: EventControl;


  public get product(): Products {
    return this.appSettings.products.find(product => product.productSelected);
  }

  constructor(
    private mainService: MainService,
    private productService: ProductsService,
    private appSettings: AppSettings
  ) {
    this.settings = this.appSettings;
  }

  ngAfterViewInit() {
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

    /**
     * When the eventControlDetail is undefined, reload the product selected
     */
    if (!this.eventControlDetails) {
      timer(500).subscribe(() => {
        this.productService.changeProduct(this.product.codeProduct);
      });
    }

  }
  /**
   *
   */
  ngOnDestroy() {
    this.currentEventSubscription.unsubscribe();
    this.remaingTimeCounterSubscription.unsubscribe();
  }

  /**
   * @getEventControl thrown on each event change
   * @returns event info object
   */
  public getEventControl(): EventControl {
    // Create layout object
    let eventsControlDetails: EventControl;
    try {
      eventsControlDetails = {
        productImageClass: this.product.productSelected
          ? 'PRODUCT-' + this.product.codeProduct + '-BG'
          : '',
        productName: this.product.label,
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
      this.checkTimer();

    } catch (err) {
      console.error(err);
    }
    return eventsControlDetails;
  }


  /**
   * Subscription on timer event
   */
  private checkTimer() {
    this.remaingTimeCounterSubscription = this.mainService.remaingTimeCounterObs.subscribe(timerEvent => {
      this.eventControlDetails.eventTimeMinutes = timerEvent.minute;
      this.eventControlDetails.eventTimeSeconds = timerEvent.second;
    });
  }
}
