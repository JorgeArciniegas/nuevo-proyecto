import { Component, OnInit, Input } from '@angular/core';
import { BetDataDialog } from '../../../../../products/products.model';
import { DialogService } from '../../../../../products/dialog.service';
import { VirtualBetCompetitor } from '@elys/elys-api/lib/virtual/virtual.models';
import { AppSettings } from '../../../../../app.settings';

@Component({
  selector: 'app-statistics-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent implements OnInit {
  @Input()
  data: BetDataDialog;
  rows: string;
  pageNumber: number;
  currentPage: number;
  readonly elementsPerPage = 10;
  showingCompetitors: VirtualBetCompetitor[] = [];
  constructor(
    private dialog: DialogService,
    public readonly settings: AppSettings
  ) {
    this.rows = '';
  }

  ngOnInit() {
    /**
     * Defined coefficent percentage for fitness status
     */
    this.data.statistics.virtualBetCompetitor.sort((a, b) =>
      a.ito <= b.ito ? -1 : 1
    );
    this.showingCompetitors = this.data.statistics.virtualBetCompetitor.slice(
      0,
      10
    );
    this.pageNumber =
      this.data.statistics.virtualBetCompetitor.length / this.elementsPerPage;
    this.currentPage = 1;
    this.rows += '*,';
    this.showingCompetitors.map(() => {
      this.rows += '*,'; // Indicate the rows text value append to GridLayout
    });
    this.rows += '*';
  }

  close(): void {
    this.dialog.closeDialog();
  }

  previousPage(): void {
    if (this.currentPage >= 1) {
      --this.currentPage;
      const start = (this.currentPage - 1) * this.elementsPerPage;
      let end = this.currentPage * this.elementsPerPage;
      if (end > this.data.statistics.virtualBetCompetitor.length) {
        end = this.data.statistics.virtualBetCompetitor.length;
      }
      this.showingCompetitors = this.data.statistics.virtualBetCompetitor.slice(
        start,
        end
      );
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pageNumber) {
      ++this.currentPage;
      const start = (this.currentPage - 1) * this.elementsPerPage;
      let end = this.currentPage * this.elementsPerPage;
      if (end > this.data.statistics.virtualBetCompetitor.length) {
        end = this.data.statistics.virtualBetCompetitor.length;
      }
      this.showingCompetitors = this.data.statistics.virtualBetCompetitor.slice(
        start,
        end
      );
    }
  }
}
