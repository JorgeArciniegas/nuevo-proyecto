import { Component, OnInit, Input } from '@angular/core';
import { BetDataDialog } from '../../../../../../../src/app/products/products.model';
import { DialogService } from '../../../../../../../src/app/products/dialog.service';
import { AppSettings } from '../../../../../../../src/app/app.settings';
import { DataStaticsChart } from './cockfight.model';

@Component({
  selector: 'app-statistics-cockfight',
  templateUrl: './cockfight.component.html',
  styleUrls: ['./cockfight.component.scss']
})
export class CockfightComponent implements OnInit {

  @Input()
  data: BetDataDialog;
  rows: string;
  dataStaticsChart: DataStaticsChart;
  constructor(private dialog: DialogService, public readonly appSetting: AppSettings) {
    this.rows  = '';
    this.dataStaticsChart = new DataStaticsChart();
  }

  ngOnInit() {

    /**
     * Defined coefficent percentage for fitness status
     */
    this.data.statistics.virtualBetCompetitor.sort( (a, b) => a.ito <= b.ito ? -1 : 1 );
    this.data.statistics.virtualBetCompetitor.map( item => {
      this.rows += '5*,'; // Indicate the rows text value append to GridLayout
      this.dataStaticsChart.STRENGTH += item.ac[0];
      this.dataStaticsChart.ENDURANCE += item.ac[1];
      this.dataStaticsChart.AGILITY += item.ac[2];
    });
    this.rows = this.rows.substr(0, this.rows.length - 1 );  // removed last `,` to string Rows

  }


  close(): void {
    this.dialog.closeDialog();
  }
}
