import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { EventControlService } from './event-control.service';

@Component({
  moduleId: module.id,
  selector: 'app-event-control, [app-event-control]',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent implements AfterViewInit, OnDestroy {

  constructor(
    public readonly eventControlService: EventControlService
  ) {

  }


  ngAfterViewInit() {
    this.eventControlService.init();
  }

  ngOnDestroy() {
    this.eventControlService.destroy();
  }
}
