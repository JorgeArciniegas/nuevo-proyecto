import { Component, Input } from '@angular/core';
import { SoccerService } from '../soccer.service';
import { VirtualBetSelection } from '@elys/elys-api';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input()
  public rowHeight: number;

  constructor(public soccerService: SoccerService) {}

  selectOdd(marketId: number, selection: VirtualBetSelection): void {
    this.soccerService.selectOdd(marketId, selection);
  }
}
