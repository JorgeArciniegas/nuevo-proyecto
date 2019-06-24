import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EventsListService } from './events-list.service';
import { EventsList } from './event-list.model';
import { MainService } from '../main.service';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
  @Input()
  public rowHeight: number;
  @Input()
  public show?: boolean;
  public eventsDetails: EventsList;
  private currentEventSubscription: Subscription;
  constructor(
    private mainService: MainService,
    private eventService: EventsListService,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    // subscribe to the event change
    this.currentEventSubscription = this.mainService.currentEventSubscribe.subscribe(
      event => {
        /**
         * @eventsDetails is passed as input to a final list component
         */
        this.eventsDetails = this.eventService.getEventDetailsList();
      }
    );
  }
  ngOnDestroy() {
    this.currentEventSubscription.unsubscribe();
  }
}
