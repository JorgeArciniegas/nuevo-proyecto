import { Component, Input, OnInit } from '@angular/core';
import { TypePlacingEvent } from '../main/main.models';
import { MainService } from '../main/main.service';
import { UserService } from '../../../../src/app/services/user.service';

@Component({
  selector: 'app-advance-game',
  templateUrl: './advance-game.component.html',
  styleUrls: ['./advance-game.component.scss']
})
export class AdvanceGameComponent implements OnInit {
  @Input()
  public timeBlocked = false;
  @Input()
  public rowHeight: number;

  public buttons: AdvButton[] = [];
  typePlacingRace: typeof TypePlacingEvent = TypePlacingEvent;
  constructor(public service: MainService, private userService: UserService) {}

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

  setTypePlacing(type: TypePlacingEvent): void {
    this.service.typePlacing(type);
  }
}

export class AdvButton {
  public label: string;
  public code: TypePlacingEvent;
}
