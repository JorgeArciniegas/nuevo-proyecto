import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ProductsService } from '../../products.service';
import { EventControlService } from './event-control.service';

@Component({
  moduleId: module.id,
  selector: 'app-event-control, [app-event-control]',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent implements OnDestroy {

  constructor(
    public readonly eventControlService: EventControlService,
    public readonly productService: ProductsService
  ) {
    this.eventControlService.init();
  }


  ngOnDestroy() {
    this.eventControlService.destroy();
  }
}
