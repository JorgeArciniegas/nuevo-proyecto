import { Component, Input, OnInit } from '@angular/core';
import { TypePlacingRace } from '../dogracing/dogracing.models';
import { DogracingService } from '../dogracing/dogracing.service';

@Component({
  selector: 'app-advance-game',
  templateUrl: './advance-game.component.html',
  styleUrls: ['./advance-game.component.scss']
})
export class AdvanceGameComponent implements OnInit {
  @Input()
  public timeBlocked = false;
  public buttons: AdvButton[] = [];
  typePlacingRace: typeof TypePlacingRace = TypePlacingRace;
  constructor(public service: DogracingService) {}

  ngOnInit() {
    this.buttons.push({
      label: this.typePlacingRace[0],
      code: this.typePlacingRace['ST']
    });
    this.buttons.push({
      label: this.typePlacingRace[1],
      code: this.typePlacingRace['ACCG']
    });
    this.buttons.push({
      label: this.typePlacingRace[2],
      code: this.typePlacingRace['R']
    });
  }

  setTypePlacing(type: TypePlacingRace): void {
    this.service.typePlacing(type);
  }
}

export class AdvButton {
  public label: string;
  public code: TypePlacingRace;
}
