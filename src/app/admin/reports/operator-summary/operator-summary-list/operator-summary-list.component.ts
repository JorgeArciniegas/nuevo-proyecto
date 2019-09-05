import { Component, OnInit } from '@angular/core';
import { OperatorSummaryService } from '../operator-summary.service';
import { ReportsOperatorVolumeResponse } from '@elys/elys-api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-operator-summary-list',
  templateUrl: './operator-summary-list.component.html',
  styleUrls: ['./operator-summary-list.component.scss']
})
export class OperatorSummaryListComponent implements OnInit {
  public TotalPages: number;
  public recordPerPage = 10;
  public currentPage = 1;
  public currentOperatorVolumes: ReportsOperatorVolumeResponse[] = [];

  constructor(public operatorSummaryService: OperatorSummaryService, public userService: UserService) {
    this.TotalPages = Math.ceil(this.operatorSummaryService.reportsOperatorVolumeResponse.length / this.recordPerPage);
    if (this.TotalPages === 0) {
      this.TotalPages = 1;
    }
    this.currentOperatorVolumes = this.operatorSummaryService.reportsOperatorVolumeResponse.slice(this.currentPage - 1, this.recordPerPage);
  }

  ngOnInit() {
  }

  nextPage() {
    if (this.currentPage < this.TotalPages) {
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
