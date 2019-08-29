import { Component, OnInit, Input } from '@angular/core';
import { BetDataDialog } from '../../../../../products/products.model';
import { DataStaticsChart } from '../soccer/soccer.model';
import { DialogService } from '../../../../../products/dialog.service';

@Component({
  selector: 'app-statistics-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent implements OnInit {
  @Input()
  data: BetDataDialog;
  rows: string;
  dataStaticsChart: DataStaticsChart;
  constructor(private dialog: DialogService) {
    this.rows = '';
    this.dataStaticsChart = new DataStaticsChart();
  }

  ngOnInit() {
    /**
     * Defined coefficent percentage for fitness status
     */
    this.data.statistics.virtualBetCompetitor.sort((a, b) =>
      a.ito <= b.ito ? -1 : 1
    );
    this.data.statistics.virtualBetCompetitor.map(item => {
      this.rows += '4*,'; // Indicate the rows text value append to GridLayout
      this.dataStaticsChart.CONDITION += item.ff;
      this.dataStaticsChart.ATTACK += item.ac[0];
      this.dataStaticsChart.DEFENCE += item.ac[1];
    });
    this.rows = this.rows.substr(0, this.rows.length - 1); // removed last `,` to string Rows
    console.log('rows: ', this.rows);
    console.log('dataStaticsChart: ', this.dataStaticsChart);
    console.log(
      'virtualBetCompetitor',
      this.data.statistics.virtualBetCompetitor
    );
  }

  close(): void {
    this.dialog.closeDialog();
  }
}
