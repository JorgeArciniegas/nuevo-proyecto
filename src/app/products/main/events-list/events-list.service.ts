import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { EventList } from './event-list.model';
import { LAYOUT_TYPE } from 'src/environments/environment.models';

@Injectable({
  providedIn: 'root'
})
export class EventsListService {
  public eventsDetails: EventList[];
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  constructor(private mainService: MainService) {}
  public getEventDetailsList(): EventList[] {
    this.eventsDetails = [];
    this.mainService.raceDetails.races.forEach(race => {
      this.eventsDetails.push({
        eventLabel: race.label,
        eventStart: race.date,
        eventNumber: race.number,
        currentEvent: this.mainService.raceDetails.currentRace
      });
    });
    return this.eventsDetails;
  }
}
