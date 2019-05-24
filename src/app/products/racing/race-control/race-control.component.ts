import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { RaceTime } from '../racing.models';
import { RacingService } from '../racing.service';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-race-control',
  templateUrl: './race-control.component.html',
  styleUrls: ['./race-control.component.scss']
})
export class RaceControlComponent implements OnInit {
  public raceTime: RaceTime;
  public race: number;
  public settings: AppSettings;

  constructor(
    public racingService: RacingService,
    public readonly appSettings: AppSettings,
    public productService: ProductsService
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {}
}
