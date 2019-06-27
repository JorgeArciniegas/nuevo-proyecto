import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { EventsList, EventList } from './event-list.model';
import { LAYOUT_TYPE } from '../../../../environments/environment.models';

@Injectable({
  providedIn: 'root'
})
export class EventsListService {
  public eventsDetails: EventsList;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  constructor(private mainService: MainService) {}
  /**
   * @getEventDetailsList thrown on each event change
   * @returns next events collection
   */
  public getEventDetailsList(): EventsList {
    // initialize empty layout object
    console.log('getEventDetailsList');
    this.eventsDetails = { currentEvent: 0, events: [] };
    this.eventsDetails.currentEvent = this.mainService.raceDetails.currentRace;
    this.mainService.raceDetails.races.forEach(race => {
      this.eventsDetails.events.push({
        eventLabel: race.label,
        eventStart: race.date,
        eventNumber: race.number
      });
    });
    return this.eventsDetails;
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
