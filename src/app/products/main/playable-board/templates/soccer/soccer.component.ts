import { Component, Input, OnDestroy } from '@angular/core';
import { SoccerService } from './soccer.service';
import { UserService } from '../../../../../services/user.service';
import { MainService } from '../../../../../products/main/main.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-playable-board-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent implements OnDestroy {
  @Input()
  public rowHeight: number;

  constructor(public soccerService: SoccerService, public mainService: MainService, public userService: UserService) {
    this.soccerService.subscribeToObservables();
  }

  ngOnDestroy() {
    this.soccerService.destroySubscriptions();
  }

  // Method to open the details of the selected match
  openEventDetails(matchIndex: number): void {
    this.soccerService.openEventDetails(matchIndex);
  }
}
