import { Component, OnDestroy } from '@angular/core';
import { EventControlService } from './event-control.service';
import { EventControl } from './event-control.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-event-control',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent implements OnDestroy {
  public eventControlDetails: EventControl;
  constructor(
    private eventControlService: EventControlService,
    private productService: ProductsService
  ) {}
  ngOnDestroy() {
    this.eventControlService.customUnsubscribe();
  }
}
