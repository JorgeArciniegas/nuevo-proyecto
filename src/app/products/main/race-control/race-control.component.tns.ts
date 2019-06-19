import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../products.service';
import { RaceTime } from '../main.models';
import { MainService } from '../main.service';

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
    public racingService: MainService,
    public productService: ProductsService,
    public readonly appSettings: AppSettings
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {}
}
