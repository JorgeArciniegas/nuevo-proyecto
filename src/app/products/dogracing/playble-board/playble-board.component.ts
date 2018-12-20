import { Component, Input, OnInit } from '@angular/core';
import { PlacingRace } from '../dogracing.models';
import { DogracingService } from '../dogracing.service';

@Component({
  selector: 'app-playble-board',
  templateUrl: './playble-board.component.html',
  styleUrls: ['./playble-board.component.scss']
})
export class PlaybleBoardComponent implements OnInit {
  @Input()
  rowHeight: number;

  placingRace: PlacingRace; // place the race
  constructor(public service: DogracingService) {
    this.placingRace = new PlacingRace();
  }

  ngOnInit() {}

  dogplaced(dog: number, pos: number): void {
    if (!this.placingRace.raceNumber) {
      // this.placingRace
    }
  }
}
