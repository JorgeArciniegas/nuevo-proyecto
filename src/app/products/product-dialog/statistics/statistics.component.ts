import { Component, OnInit, Input } from '@angular/core';
import { BetDataDialog } from '../../products.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input()
  data: BetDataDialog;
  maxDataStatistics: number;
  constructor() {
    this.maxDataStatistics = 1;


  }

  ngOnInit() {

    /**
     * Defined coefficent percentage for fitness status
     */
    this.data.statistics.sort( (a, b) => a.ito <= b.ito ? -1 : 1 );
    this.data.statistics.map( item => {
      this.maxDataStatistics += item.ff;
    });

    this.maxDataStatistics = this.maxDataStatistics ;
  }

}
