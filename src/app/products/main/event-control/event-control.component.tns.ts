import { Component } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../products.service';
import { EventTime } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-event-control',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent {
  public eventTime: EventTime;
  public race: number;
  public settings: AppSettings;

  constructor(
    public racingService: MainService,
    public productService: ProductsService,
    public readonly appSettings: AppSettings
  ) {
    this.settings = appSettings;
  }
}
