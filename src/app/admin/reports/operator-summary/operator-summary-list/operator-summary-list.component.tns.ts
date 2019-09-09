import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { OperatorSummaryService } from '../operator-summary.service';
import { ReportsOperatorVolumeResponse } from '@elys/elys-api';
import { RouterExtensions } from 'nativescript-angular/router';

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

  constructor(public userService: UserService, public operatorSummaryService: OperatorSummaryService, private router: RouterExtensions) {
    this.totalPages = Math.ceil(this.operatorSummaryService.reportsOperatorVolumeResponse.length / this.recordPerPage);
    if (this.totalPages === 0) {
      this.totalPages = 1;
    }
    this.currentOperatorVolumes = this.operatorSummaryService.reportsOperatorVolumeResponse.slice(this.currentPage - 1, this.recordPerPage);
  }

  goBack(): void {
    this.router.back();
  }

  nextPage() {
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

  previousPage() {
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
}
