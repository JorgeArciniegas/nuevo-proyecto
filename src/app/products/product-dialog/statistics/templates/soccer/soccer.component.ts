import { Component, OnInit, Input } from '@angular/core';
import { DataStaticsChart } from '../soccer/soccer.model';
import { DialogService } from '../../../../../products/dialog.service';
import { BetDataDialog } from '../../../../../products/products.model';
import { AppSettings } from '../../../../../app.settings';

@Component({
  selector: 'app-statistics-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent implements OnInit {
  @Input()
  data: BetDataDialog;

  dataStaticsChart: DataStaticsChart;
  constructor(
    private dialog: DialogService,
    public readonly appSetting: AppSettings
  ) {
    this.dataStaticsChart = new DataStaticsChart();
  }

  ngOnInit() {
    this.data.statistics.virtualBetCompetitor.sort((a, b) =>
      a.ito <= b.ito ? -1 : 1
    );
    this.data.statistics.virtualBetCompetitor.map(item => {
      this.dataStaticsChart.CONDITION += item.ff;
      this.dataStaticsChart.ATTACK += item.ac[0];
      this.dataStaticsChart.DEFENCE += item.ac[1];
    });
  }
}
