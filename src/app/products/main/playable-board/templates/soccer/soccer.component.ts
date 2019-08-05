import { Component, Input } from '@angular/core';
import { SoccerService } from './soccer.service';

@Component({
  selector: 'app-playable-board-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent {
  @Input()
  public rowHeight: number;

  constructor(public soccerService: SoccerService) {}

  // Method to open the details of the selected match
  openEventDetails(matchIndex: number): void {
    this.soccerService.openEventDetails(matchIndex);
  }
}
