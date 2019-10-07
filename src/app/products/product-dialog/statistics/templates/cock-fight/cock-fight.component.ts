import { Component, OnInit, Input } from '@angular/core';
import { BetDataDialog } from '../../../../products.model';
import { DialogService } from '../../../../dialog.service';
import { DataStaticsChart } from './cock-fight.model';

@Component({
  selector: 'app-statistics-cock-fight',
  templateUrl: './cock-fight.component.html',
  styleUrls: ['./cock-fight.component.scss']
})
export class CockFightComponent implements OnInit {
  @Input()
  data: BetDataDialog;

  dataStaticsChart: DataStaticsChart;
  constructor(private dialog: DialogService) {
    this.dataStaticsChart = new DataStaticsChart();
  }

  ngOnInit() {
    this.data.statistics.virtualBetCompetitor.sort((a, b) => (a.ito <= b.ito ? -1 : 1));
    this.data.statistics.virtualBetCompetitor.map(item => {
      this.dataStaticsChart.STRENGTH += item.ac[0];
      this.dataStaticsChart.ENDURANCE += item.ac[1];
      this.dataStaticsChart.AGILITY += item.ac[2];
    });
  }
}
