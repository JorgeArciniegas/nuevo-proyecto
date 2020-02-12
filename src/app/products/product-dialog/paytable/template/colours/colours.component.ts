import { Component, OnInit } from '@angular/core';
import { LotteryPayoutSelection } from '@elys/elys-api';
import { ColoursCommonComponent } from './colours-common.component';

@Component({
  selector: 'app-paytable-colours',
  templateUrl: './colours.component.html',
  styleUrls: ['./colours.component.scss']
})
export class ColoursComponent extends ColoursCommonComponent implements OnInit {

  public gameSelections: LotteryPayoutSelection[];
  constructor() {
    super();
  }

  ngOnInit() {
    this.filterPayout();
  }

}
