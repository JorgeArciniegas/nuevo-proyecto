import { Component } from '@angular/core';
import { ReportsOperatorVolumeResponse } from '@elys/elys-api';
import { UserService } from '../../../../services/user.service';
import { RouterService } from '../../../../services/utility/router/router.service';
import { OperatorSummaryService } from '../operator-summary.service';
import { OperatorSummary } from './print-operator-summary/operator-summary.model';
import { PrintOperatorSummaryService } from './print-operator-summary/print-operator-summary.service';

@Component({
  selector: 'app-operator-summary-list',
  templateUrl: './operator-summary-list.component.html',
  styleUrls: ['./operator-summary-list.component.scss']
})
export class OperatorSummaryListComponent {
  public totalPages: number;
  public recordPerPage = 10;
  public currentPage = 1;
  public currentOperatorVolumes: ReportsOperatorVolumeResponse[] = [];

  constructor(public userService: UserService, public operatorSummaryService: OperatorSummaryService,
    private router: RouterService, private printOperatorSummary: PrintOperatorSummaryService) {
    this.totalPages = Math.ceil(this.operatorSummaryService.reportsOperatorVolumeResponse.length / this.recordPerPage);
    if (this.totalPages === 0) {
      this.totalPages = 1;
    }
    this.currentOperatorVolumes = this.operatorSummaryService.reportsOperatorVolumeResponse.slice(this.currentPage - 1, this.recordPerPage);
  }

  goBack(): void {
    this.router.getBack();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      ++this.currentPage;
      const start = (this.currentPage - 1) * this.recordPerPage;
      let end = this.currentPage * this.recordPerPage;
      if (end > this.operatorSummaryService.reportsOperatorVolumeResponse.length) {
        end = this.operatorSummaryService.reportsOperatorVolumeResponse.length;
      }
      this.currentOperatorVolumes = this.operatorSummaryService.reportsOperatorVolumeResponse.slice(
        start,
        end
      );
    }
  }

  previousPage(): void {
    if (this.currentPage >= 1) {
      --this.currentPage;
      const start = (this.currentPage - 1) * this.recordPerPage;
      let end = this.currentPage * this.recordPerPage;
      if (end > this.operatorSummaryService.reportsOperatorVolumeResponse.length) {
        end = this.operatorSummaryService.reportsOperatorVolumeResponse.length;
      }
      this.currentOperatorVolumes = this.operatorSummaryService.reportsOperatorVolumeResponse.slice(
        start,
        end
      );
    }
  }

  printUserSummary(): void {
    const operatorSummary: OperatorSummary = {
      operatorVolumes: this.operatorSummaryService.reportsOperatorVolumeResponse,
      totalStake: this.operatorSummaryService.totalStake,
      totalVoided: this.operatorSummaryService.totalVoided,
      totalWon: this.operatorSummaryService.totalWon,
      dateFrom: this.operatorSummaryService.dateFrom,
      dateTo: this.operatorSummaryService.dateTo,
      dateStamp: new Date()
    };
    this.printOperatorSummary.printWindow(operatorSummary);
  }
}
