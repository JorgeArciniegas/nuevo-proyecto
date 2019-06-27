import { Injectable } from '@angular/core';
import { LAYOUT_TYPE } from '../../../../../src/environments/environment.models';
import { MainService } from '../main.service';
import { EventControl } from './event-control.model';
import { AppSettings } from 'src/app/app.settings';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
  // deps: [MainService, ProductsService]
})
export class EventControlService {
  public eventsControlDetails: EventControl;
  private currentEventSubscription: Subscription;
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
        /**
         * @eventsDetails is passed as input to a control template
         */
        this.eventControlDetails = this.getEventControl();
        (this.eventControlDetails.eventTimeMinutes = this.mainService.raceDetails.raceTime.minute),
          (this.eventControlDetails.eventTimeSeconds = this.mainService.raceDetails.raceTime.second);
        // console.log(this.eventControlDetails);
      }
    );
  }
  /**
   * @getEventDetailsList thrown on each event change
   * @returns next events collection
   */
  public getEventControl(): EventControl {
    // initialize empty layout object
    this.eventsControlDetails = {
      productImageClass: this.productService.product.productSelected
        ? 'PRODUCT-' + this.productService.product.codeProduct + '-BG'
        : '',
      productName: this.productService.product.label,
      currentEvent: this.mainService.raceDetails.races[
        this.mainService.raceDetails.currentRace
      ],
      eventLabel: this.mainService.raceDetails.races[
        this.mainService.raceDetails.currentRace
      ].label,
      eventNumber: this.mainService.raceDetails.races[
        this.mainService.raceDetails.currentRace
      ].number,
      eventTimeMinutes: this.mainService.raceDetails.raceTime.minute,
      eventTimeSeconds: this.mainService.raceDetails.raceTime.second,
      showEventId: this.settings.showRaceId
    };
    return this.eventsControlDetails;
  }
  customUnsubscribe() {
    this.currentEventSubscription.unsubscribe();
  }
}
