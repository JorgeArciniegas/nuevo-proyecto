import { Injectable } from '@angular/core';
import { CouponStatus, CouponType, ElysApiService } from '@elys/elys-api';
import { TranslateService } from '@ngx-translate/core';
import { RequestBetsList, ProductEnum } from './bets-list.model';

@Injectable({
  providedIn: 'root'
})
export class BetsListService {

  request: RequestBetsList;
  pageSizeList: number[] = [10, 25, 50, 100];
  private _typeDataSelected: boolean;

  constructor(translate: TranslateService, elysApi: ElysApiService) {
    /**
     * Request default object
     */
    this.request = {
      couponStatus: CouponStatus.Unknown,
      dateFrom: new Date(),
      dateTo: new Date(),
      pageSize: this.pageSizeList[1],
      requestedPage: 0,
      couponType: CouponType.Unknown,
      language: translate.currentLang,
      sportId: ProductEnum.ALL
    };
  }

  /**
   * GETTER AND SETTER OBJECT PROPERTY
   */

  get typeDataSelected(): boolean {
    return this._typeDataSelected;
  }
  set typeDataSelected(value: boolean) {
    this._typeDataSelected = value;
  }

  get couponStatus() {
    return this.request.couponStatus;
  }

  set couponStatus(status: CouponStatus) {
    this.request.couponStatus = status;
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

  get couponType() {
    return this.request.couponType;
  }

  set couponType(type: CouponType) {
    this.request.couponType = type;
  }

  get sportId() {
    return this.request.sportId;
  }

  set sportId(sportId: number) {
    this.request.sportId = sportId;
  }

  get ticketCode() {
    return this.request.ticketCode || null;
  }

  set ticketCode(ticketCode: string) {
    this.request.ticketCode = ticketCode;
  }

  get complianceCode() {
    return this.request.complianceCode || null;
  }

  set complianceCode(complianceCode: string) {
    this.request.complianceCode = complianceCode;
  }
}
