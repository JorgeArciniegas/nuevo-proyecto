import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { EventsListService } from './events-list.service';
@Component({
  moduleId: module.id,
  selector: 'app-events-list, [app-events-list]',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input()
  public rowHeight: number;
  // public eventsDetails: EventsList;
  public nativeNextEventsItems: string;
  constructor(
    private eventService: EventsListService,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.nativeNextEventsItems = this.eventService.genColumns(
      this.productService.product.layoutProducts.nextEventItems
    );
    // subscribe to the product change.
    // Used by native to get the correct number of events column when product changes
    this.productService.productNameSelectedSubscribe.subscribe(prod => {
      this.nativeNextEventsItems = this.eventService.genColumns(
        this.productService.product.layoutProducts.nextEventItems
      );
    });
  }

}
