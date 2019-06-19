import { Component, Input, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-list-race',
  templateUrl: './list-race.component.html',
  styleUrls: ['./list-race.component.scss']
})
export class ListRaceComponent implements OnInit {
  @Input()
  public rowHeight: number;
  @Input()
  public show?: boolean;

  constructor(public racingService: MainService) {}

  ngOnInit() {}

  raceSelecting(selected: number) {
    this.racingService.fireCurrentRaceChange(selected, true);
  }
}
