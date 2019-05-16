import { Injectable } from '@angular/core';
import { CouponType, ElysApiService } from '@elys/elys-api';
import { AccountVirtualSport } from '@elys/elys-api';
import { TranslateService } from '@ngx-translate/core';
import { CouponStatusInternal, CouponTypeInternal } from './bets-list.model';
import { VirtualCouponListRequest, CouponSummaryCouponListResponse } from '@elys/elys-api/lib/reports/reports.models';
import { Router } from '@angular/router';
import { all } from 'q';

@Injectable({
  providedIn: 'root'
})
export class BetsListService {

  request: VirtualCouponListRequest = null;
  availableSport: AccountVirtualSport[] = [];
  pageSizeList: number[] = [10, 25, 50, 100];
  labelAvailableSportSelected: string;

  // Result of request list
  betsCouponList: CouponSummaryCouponListResponse = null;


  constructor(translate: TranslateService, public elysApi: ElysApiService, private router: Router) {

    this.getAvailableSport();
    /**
     * Request default object
     */
    this.request = {
      couponStatus: CouponStatusInternal.ALL,
      dateFrom: new Date(),
      dateTo: new Date(),
      pageSize: this.pageSizeList[1],
      requestedPage: 0,
      couponType: CouponTypeInternal.ALL,
      sportId: this.availableSport[0].SportId,
      product: null,
      complianceCode: '',
      ticketCode: '',
      dateHasPlaced: false
    };
  }


  /**
   * GETTER AND SETTER OBJECT PROPERTY
   */

  get dateHasPlaced(): boolean {
    return this.request.dateHasPlaced;
  }
  set dateHasPlaced(value: boolean) {
    this.request.dateHasPlaced = value;
  }

  get couponStatus() {
    return this.request.couponStatus;
  }

  set couponStatus(status: CouponStatusInternal) {
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
    this.labelAvailableSportSelected = this.availableSport.filter( item => item.SportId === this.request.sportId )[0].SportName;
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

  async getAvailableSport(): Promise<void> {
    // first element of ALL Sport
    this.availableSport[0] = {SportId: 0, SportName: 'ALL', VirtualCategories: [] };

    await this.elysApi.virtual.getAvailablevirtualsports().then(items => {
      items.forEach( item => this.availableSport.push(item) );
    });
    this.sportId = this.availableSport[0].SportId;

  }

  getList(): void {
    const req: VirtualCouponListRequest = this.request;
    if (req.sportId === 0) { req.sportId = null; }
    this.elysApi.reports.getVirtualListOfCoupon(req).then( items => this.betsCouponList = items);

    this.router.navigateByUrl('admin/reports/betsList/summaryCoupons');
  }
}
