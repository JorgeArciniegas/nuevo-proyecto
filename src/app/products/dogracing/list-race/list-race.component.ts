import { Component, Input, OnInit } from '@angular/core';
import { DogracingService } from '../dogracing.service';

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

  constructor(public dogracingService: DogracingService) {}

  ngOnInit() {}

  raceSelecting(selected: number) {
    this.dogracingService.currentRaceSubscribe.next(selected);
  }
}
