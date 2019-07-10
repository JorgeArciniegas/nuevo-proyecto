import { Component, OnInit, Input } from '@angular/core';
import { BetDataDialog } from '../../../../../../../src/app/products/products.model';
import { DialogService } from '../../../../../../../src/app/products/dialog.service';
import { DataStaticsChart } from './cockfight.model';

@Component({
  selector: 'app-statistics-cockfight',
  templateUrl: './cockfight.component.html',
  styleUrls: ['./cockfight.component.scss']
})
export class CockfightComponent implements OnInit {

  @Input()
  data: BetDataDialog;

  dataStaticsChart: DataStaticsChart;
  constructor(private dialog: DialogService) {
    this.dataStaticsChart = new DataStaticsChart();
  }

  ngOnInit() {
    this.data.statistics.virtualBetCompetitor.sort( (a, b) => a.ito <= b.ito ? -1 : 1 );
    this.data.statistics.virtualBetCompetitor.map( item => {
      this.dataStaticsChart.STRENGTH += item.ac[0];
      this.dataStaticsChart.ENDURANCE += item.ac[1];
      this.dataStaticsChart.AGILITY += item.ac[2];
    });
  }

}
