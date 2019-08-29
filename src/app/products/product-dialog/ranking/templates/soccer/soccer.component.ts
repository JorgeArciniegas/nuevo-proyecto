import { Component, OnInit, Input } from '@angular/core';
import { BetDataDialog } from 'src/app/products/products.model';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-ranking-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent implements OnInit {
  @Input()
  data: BetDataDialog;
  public page = 0;
  public maxPage = 2;
  //public teamsData: BetOdd[];

  constructor(public settings: AppSettings) {
    console.log(this.data);
  }

  ngOnInit() {}

  previusTeams() {
    if (this.page <= 0) {
      return;
    }
    this.page--;
    // if (this.betOdds) {
    //   this.filterOdds();
    // } else {
    //   this.filterOddsToCoupon();
    // }
  }

  nextTeams() {
    if (this.page >= this.maxPage - 1) {
      return;
    }
    this.page++;
    // if (this.betOdds) {
    //   this.filterOdds();
    // } else {
    //   this.filterOddsToCoupon();
    // }
  }
}
