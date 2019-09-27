import { Component, Input } from '@angular/core';
import { EventControlService } from './event-control.service';
import { EventControl } from './event-control.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-event-control',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent {
  @Input()
  public eventControlDetails: EventControl;
  constructor(
    public readonly eventControlService: EventControlService,
    public readonly productService: ProductsService
  ) {}
}
