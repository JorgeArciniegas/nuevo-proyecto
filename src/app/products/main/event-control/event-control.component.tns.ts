import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LAYOUT_TYPE, Products } from '../../../../environments/environment.models';
import { AppSettings } from '../../../app.settings';
import { LoaderService } from '../../../services/utility/loader/loader.service';
import { ProductsService } from '../../products.service';
import { MainService } from '../main.service';
import { EventControl } from './event-control.model';

@Component({
  moduleId: module.id,
  selector: 'app-event-control, [app-event-control]',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent implements OnInit, OnDestroy {
  private currentEventSubscription: Subscription;
  private _eventControlDetails: EventControl;
  public get eventControlDetails(): EventControl {
    return this._eventControlDetails;
  }
  public set eventControlDetails(value: EventControl) {
    this._eventControlDetails = value;

  }

  private remaingTimeCounterSubscription: Subscription;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;

  private _typeProductSelected: LAYOUT_TYPE;
  public get typeProductSelected(): LAYOUT_TYPE {
    return this.productService.product.layoutProducts.type;
  }
  public set typeProductSelected(value: LAYOUT_TYPE) {
    this._typeProductSelected = value;
  }



  public get product(): Products {
    return this.settings.products.find(product => product.productSelected);
  }

  eventControlDetailsSubscription: Subscription;

  constructor(

    private loaderService: LoaderService,
    private mainService: MainService,
    private productService: ProductsService,
    private settings: AppSettings
  ) {

    this.eventControlDetails = new EventControl();
  }


  ngOnInit() {

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
        this.eventControlDetails = this.getEventControl(event);
      }
    );
    // when app to start check if the subscription is enabled
    if (!this.eventControlDetails || !this.eventControlDetails.currentEvent) {
      try {
        this.eventControlDetails = this.getEventControl();
      } catch (err) {
        console.log('ERROR LOAD EventControlService getEventControl() --> ', err);
      }
    }

    this.eventControlDetailsSubscription = this.mainService.currentEventSubscribe.subscribe(
      event => {
        // Reset polling on timer when event changes
        // check if timer subscriptions exist, if so unsubscribe them.
        if (this.remaingTimeCounterSubscription) {
          this.remaingTimeCounterSubscription.unsubscribe();
        }
        /**
         * @eventControlDetails is passed as input to a control template
         */
        this.eventControlDetails = this.getEventControl(event);
      }
    );
  }

  ngOnDestroy() {
    this.eventControlDetailsSubscription.unsubscribe();
  }


  /**
     * @getEventControl thrown on each event change
     * @returns event info object
     */
  public getEventControl(event?: number): EventControl {

    const currentEventIdx: number = event ? event : this.mainService.eventDetails.currentEvent;

    // Create layout object
    const eventsControlDetails: EventControl = {
      productImageClass: this.product.productSelected
        ? 'PRODUCT-' + this.product.codeProduct + '-BG'
        : '',
      productName: this.product.label,
      currentEvent: this.mainService.eventDetails.events[currentEventIdx],
      eventLabel: this.mainService.eventDetails.events[currentEventIdx].label,
      eventNumber: this.mainService.eventDetails.events[currentEventIdx].number,
      showEventId: this.settings.showEventId,
      isWindowSizeSmall: this.productService.windowSize.small,
      theme: this.settings.theme
    };
    this.remaingTimeCounterSubscription = this.mainService.remaingTimeCounterObs.subscribe(timerEvent => {
      eventsControlDetails.eventTimeMinutes = timerEvent.minute;
      eventsControlDetails.eventTimeSeconds = timerEvent.second;
    });

    return eventsControlDetails;
  }
}
