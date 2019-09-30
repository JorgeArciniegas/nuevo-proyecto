import { Injectable } from '@angular/core';
import { ReportsCtdAggregatesRequest, ReportsCtdAggregatesResponse, ElysApiService } from '@elys/elys-api';
import { UserService } from '../../../services/user.service';
import { DataListOfCtdAggregate } from './statement-virtual-shop.model';
import { ExcelService } from '../../../services/utility/export/excel.service';


@Injectable({
  providedIn: 'root'
})
export class StatementVirtualShopService {

  request: ReportsCtdAggregatesRequest = null;
  aggregatesData: DataListOfCtdAggregate = new DataListOfCtdAggregate();
  aggregatesTempData: ReportsCtdAggregatesResponse[] = [];

  // counter for max row per page
  rowNumber = 10;

  constructor(
    private userService: UserService,
    private elysApi: ElysApiService,
    private exportService: ExcelService
  ) {
    this.initData();
  }

  /**
   * GETTER AND SETTER REQUEST'S PARAMETERS
   */
  get UserId() {
    return this.request.UserId;
  }

  set UserId(userId: number) {
    this.request.UserId = userId;
  }
  get dateFrom() {
    return this.request.FromDate;
  }

  set dateFrom(date: Date) {
    this.request.FromDate = date;
  }

  get dateTo() {
    return this.request.ToDate;
  }

  set dateTo(date: Date) {
    this.request.ToDate = date;

    this.request.ToDate.setHours(23);
    this.request.ToDate.setMinutes(59);
    this.request.ToDate.setSeconds(59);
  }


  /**
   * Set the default value
   */
  initData(): void {
    try {
      const today = new Date();
      this.request = {
        UserId: this.userService.dataUserDetail.userDetail.UserId,
        // Set the date from the begin of the day.
        FromDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0, 0, 0),
        // Set the date at the 23:59:59 to the current day.
        ToDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 23, 59, 59)
      };
    } catch (err) {
      console.error(err);
    }

  }

  /**
   *
   */
  getData(): void {
    this.elysApi.reports.getCtdAggregates(this.request).then(
      (items) => {
        if (items.length > 0) {
          // create a new aggregates object
          this.aggregatesData = new DataListOfCtdAggregate();
          this.aggregatesData.aggregates = items;
          // generate the totals
          items.map(item => {
            this.aggregatesData.totals.Stake += item.Stake || 0;
            this.aggregatesData.totals.Won += item.Won || 0;
            this.aggregatesData.totals.MegaJackpot += item.MegaJackpot || 0;
            this.aggregatesData.totals.NumberOfCoupons += item.NumberOfCoupons || 0;
            this.aggregatesData.totals.ShopJackpot += item.ShopJackpot || 0;
            this.aggregatesData.totals.TotalProfit += item.Profit || 0;
          });

        }
        this.pagination();
      }
    );
  }

  /**
   * Paginator
   * It define the paginator
   */
  private pagination(): void {
    if (this.aggregatesData.aggregates) {
      this.aggregatesData.totalPages = (this.aggregatesData.aggregates.length > 0)
        ? Math.ceil(this.aggregatesData.aggregates.length / this.rowNumber) : 0;

      this.filterOperators();
    }
  }

  /**
   * Filter and paginate the list of operators
   */
  filterOperators(): void {
    const start = this.aggregatesData.actualPages * this.rowNumber;
    let end = (this.aggregatesData.actualPages + 1) * this.rowNumber;
    if (end > this.aggregatesData.aggregates.length) {
      end = this.aggregatesData.aggregates.length;
    }
    // save the object temp for pagination
    this.aggregatesTempData = this.aggregatesData.aggregates.slice(start, end);

  }

  /**
   * Export the data aggregates to excel "XLSX"
   */

  exportData(): void {
    if (this.aggregatesData.aggregates.length > 0) {
      this.exportService.exportAsExcelFile(this.aggregatesData.aggregates, 'STATEMENT_SHOP');
    }
  }


}
