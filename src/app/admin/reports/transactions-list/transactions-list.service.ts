import { Injectable } from '@angular/core';
import { TransactionType } from './transaction-list.model';
import { RouterService } from 'src/app/services/utility/router/router.service';
import { ElysApiService } from '@elys/elys-api';
import { ReportsAccountStatementResponse, ReportsAccountStatementRequest } from '@elys/elys-api/lib/reports/reports.models';

@Injectable({
  providedIn: 'root'
})
export class TransactionsListService {
  request: ReportsAccountStatementRequest = null;
  pageSizeList: number[] = [10, 25, 50];
  sportIdSelected: number;
  // Result of request list
  transactionsList: ReportsAccountStatementResponse = null;

  constructor(public elysApi: ElysApiService, private router: RouterService) {
    // Request default object.
    this.request = {
      transactionTypesCsv: TransactionType.ALL,
      dateFrom: new Date(),
      dateTo: new Date(),
      amountFrom: 0,
      amountTo: 0,
      service: 'Unknown,Bank,SkrillWallet,Backoffice,Jackpot,WalletApi,SecureApi,Wirecard,CartaSi,Poste',
      pageSize: this.pageSizeList[0],
      requestedPage: 1,
      userWalletType: null
    };
    const today = new Date();
    this.dateFrom = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    this.dateTo = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  // Getter and setter object property.
  get transactionTypesCsv() {
    return TransactionType[this.request.transactionTypesCsv];
  }

  set transactionTypesCsv(type: TransactionType) {
    this.request.transactionTypesCsv = type;
  }

  get dateFrom() {
    return this.request.dateFrom;
  }

  set dateFrom(date: Date) {
    this.request.dateFrom = date;
  }

  get dateTo() {
    return this.request.dateTo;
  }

  set dateTo(date: Date) {
    this.request.dateTo = date;
  }

  get amountFrom() {
    return this.request.amountFrom;
  }

  set amountFrom(amount: number) {
    this.request.amountFrom = amount;
  }

  get amountTo() {
    return this.request.amountTo;
  }

  set amountTo(amount: number) {
    this.request.amountTo = amount;
  }

  get service() {
    return this.request.service;
  }

  set service(service: string) {
    this.request.service = service;
  }

  get pageSize() {
    return this.request.pageSize;
  }

  set pageSize(page: number) {
    this.request.pageSize = page;
  }

  get requestedPage() {
    return this.request.requestedPage;
  }

  set requestedPage(page: number) {
    this.request.requestedPage = page;
  }

  get userWalletType() {
    return this.request.userWalletType;
  }

  set userWalletType(userWalletType: number) {
    this.request.userWalletType = userWalletType;
  }

  /**
   * Paginator called from Summary Coupons
   * @param isIncrement
   */
  paginatorSize(isIncrement: boolean): void {
    let updateTransactionsList = false;
    if (this.request.requestedPage > 1 && !isIncrement) {
      this.request.requestedPage--;
      updateTransactionsList = true;
    } else if (isIncrement) {
      if (this.request.requestedPage < this.transactionsList.TotalPages) {
        this.request.requestedPage++;
        updateTransactionsList = true;
      }
    }

    if (updateTransactionsList) {
      this.getList();
    }
  }

  getList(reset?: boolean): void {
    if (reset) {
      this.request.requestedPage = 1;
    }
    const req: ReportsAccountStatementRequest = this.cloneRequest();

    this.elysApi.reports.getTransactionsHistory(req).then(items => (this.transactionsList = items));

    this.router.getRouter().navigateByUrl('admin/reports/transactionsList/summaryTransactions');
  }

  private cloneRequest(): ReportsAccountStatementRequest {
    const dateTo = new Date();
    dateTo.setDate(this.request.dateTo.getDate() + 1);

    return {
      transactionTypesCsv: this.request.transactionTypesCsv,
      dateFrom: this.request.dateFrom,
      dateTo: dateTo,
      amountFrom: this.request.amountFrom,
      amountTo: this.request.amountTo,
      service: this.request.service,
      pageSize: this.request.pageSize,
      requestedPage: this.request.requestedPage,
      userWalletType: this.request.userWalletType
    };
  }
}
