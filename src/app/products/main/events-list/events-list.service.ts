import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { EventsList } from './event-list.model';
import { LAYOUT_TYPE } from '../../../../environments/environment.models';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventsListService {
  public eventsDetails: EventsList;
  private currentEventSubscription: Subscription;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;

  constructor(private mainService: MainService) {
    // subscribe to the event change
    this.currentEventSubscription = this.mainService.currentEventSubscribe.subscribe(
      event => {
        /**
         * @eventsDetails is passed as input to a list template
         */
        this.getEventDetailsList();
      }
    );
  }
  /**
   * @getEventDetailsList thrown on each event change
   * @returns void
   */
  public getEventDetailsList(): void {
    // initialize empty layout object
    this.eventsDetails = { currentEvent: 0, events: [] };
    this.eventsDetails.currentEvent = this.mainService.raceDetails.currentRace;
    this.mainService.raceDetails.races.forEach(race => {
      this.eventsDetails.events.push({
        eventLabel: race.label,
        eventStart: race.date,
        eventNumber: race.number
      });
    });
  }
  // Method to build the number of columns needed to show on the NativeScript template "event-list".
  public genColumns(items: number): string {
    // Create the string to use on the template.
    let templateString = '*';
    for (let i = 1; i < items; i++) {
      templateString += ',*';
    }
    return templateString;
  }
}
