import { Component, Input } from '@angular/core';
import { BetDataDialog } from '../../products.model';
import { LAYOUT_TYPE } from 'src/environments/environment.models';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent {
  @Input()
  data: BetDataDialog;
  layout: typeof LAYOUT_TYPE = LAYOUT_TYPE;

  constructor() {
    console.log(this.data);
  }
}
