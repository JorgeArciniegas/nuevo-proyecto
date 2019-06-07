import { Component, Input, OnInit } from '@angular/core';
import { RacingService } from '../racing.service';

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

  constructor(public racingService: RacingService) {}

  ngOnInit() {}

  raceSelecting(selected: number) {
    this.racingService.fireCurrentRaceChange(selected, true);
  }
}
