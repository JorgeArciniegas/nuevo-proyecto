import { Component, Input, OnInit } from '@angular/core';
import { BetDataDialog } from '../../products.model';
import { VirtualBetCompetitor } from '@elys/elys-api';
import { DialogService } from '../../dialog.service';
import { UserService } from '../../../../../src/app/services/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @Input()
  data: BetDataDialog;
  maxDataStatistics: number;
  rows: string;
  constructor(private dialog: DialogService, private userservice: UserService) {
    this.maxDataStatistics = 1;
    this.rows = '';
  }

  ngOnInit() {
    /**
     * Defined coefficent percentage for fitness status
     */
    this.data.statistics.virtualBetCompetitor.sort((a, b) =>
      a.ito <= b.ito ? -1 : 1
    );
    this.data.statistics.virtualBetCompetitor.map(item => {
      this.rows += '3*,'; // Indicate the rows text value append to GridLayout
      this.maxDataStatistics += item.ff;
    });
    this.rows = this.rows.substr(0, this.rows.length - 1); // removed last `,` to string Rows
    this.maxDataStatistics = this.maxDataStatistics;
  }

  close(): void {
    this.dialog.showDialog = false;
    this.userservice.isModalOpen = false;
    this.userservice.isBtnCalcEditable = true;
  }
}
