import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { RaceTime } from '../dogracing.models';
import { DogracingService } from '../dogracing.service';

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
    public dogracingService: DogracingService,
    public readonly appSettings: AppSettings
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {}
}
