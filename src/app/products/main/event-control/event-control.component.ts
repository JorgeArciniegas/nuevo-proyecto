import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { EventTime } from '../main.models';
import { MainService } from '../main.service';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-event-control',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent implements OnInit {
  public raceTime: EventTime;
  public race: number;
  public settings: AppSettings;

  constructor(
    public racingService: MainService,
    public readonly appSettings: AppSettings,
    public productService: ProductsService
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {}
}
