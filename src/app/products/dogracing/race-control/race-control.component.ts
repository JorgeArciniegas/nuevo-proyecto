import { Component, OnInit } from '@angular/core';
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

  constructor(public dogracingService: DogracingService) {}

  ngOnInit() {}
}
