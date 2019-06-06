import { Injectable } from '@angular/core';
import { AccountVirtualSport, CouponType, ElysApiService } from '@elys/elys-api';
import { CouponSummaryCouponListResponse, VirtualCouponListRequest } from '@elys/elys-api/lib/reports/reports.models';
import { AppSettings } from '../../../../../src/app/app.settings';
import { RouterService } from '../../../../../src/app/services/utility/router/router.service';
import { CouponStatusInternal, CouponTypeInternal } from './bets-list.model';

@Injectable({
  providedIn: 'root'
})
export class BetsListService {
  request: VirtualCouponListRequest = null;
  availableSport: AccountVirtualSport[] = [];
  pageSizeList: number[] = [10, 25, 50, 100];
  labelAvailableSportSelected: string;
  sportIdSelected: number;
  // Result of request list
  betsCouponList: CouponSummaryCouponListResponse = null;
  constructor(
    public elysApi: ElysApiService,
    private router: RouterService,
    private appSettings: AppSettings
  ) {
    // first element of ALL Sport
    this.availableSport[0] = {
      SportId: 0,
      SportName: 'ALL',
      VirtualCategories: []
    };

    this.getAvailableSport();

    /**
     * Request default object
     */

    this.request = {
      couponStatus: CouponStatusInternal.ALL,
      dateFrom: new Date(),
      dateTo: new Date(),
      pageSize: this.pageSizeList[0],
      requestedPage: 1,
      couponType: CouponTypeInternal.ALL,
      sportId: null,
      product: null,
      complianceCode: '',
      ticketCode: '',
      dateHasPlaced: false
    };

    this.sportId = this.availableSport[0].SportId;
    const today = new Date();
    this.dateFrom = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    this.dateTo = new Date(today.getFullYear(), today.getMonth(), today.getDate());
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
    if (sportId !== null) {
      this.sportIdSelected = sportId;
      this.request.sportId = sportId;
      this.labelAvailableSportSelected = this.availableSport.filter(
        item => item.SportId === this.request.sportId
      )[0].SportName;
    }

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

  /**
   * getAvailableSport
   * set on the betlists the new  availableSport object
   * it doesn't accept the duplicate sportId
   *
   */
  getAvailableSport(): void {
    const tempKey = [];
    this.appSettings.products.map( (item) => {
      // check if the sportId is already exist
      if (tempKey.includes(item.sportId)) {
        return;
      }
      // put on the availableSport
      this.availableSport.push( {
        SportId: item.sportId,
        SportName: item.name,
        VirtualCategories: []
      });
      // update the checkArray with sportId
      tempKey.push(item.sportId);
    });
  }

  /**
   * Paginator called from Summary Coupons
   * @param isIncrement
   */
  paginatorSize(isIncrement: boolean): void {
    let updateBetList = false;
    if (this.request.requestedPage > 1 && !isIncrement) {
      this.request.requestedPage--;
      updateBetList = true;
    } else if (isIncrement) {
      if (this.request.requestedPage < this.betsCouponList.TotalPages) {
        this.request.requestedPage++;
        updateBetList = true;
      }
    }

    if (updateBetList) {
      this.getList();
    }
  }

  getList(reset?: boolean): void {
    if (reset) {
      this.request.requestedPage = 1;
    }
    const req: VirtualCouponListRequest = this.cloneRequest();

    this.elysApi.reports
      .getVirtualListOfCoupon(req)
      .then(items => (this.betsCouponList = items));

    this.router
      .getRouter()
      .navigateByUrl('admin/reports/betsList/summaryCoupons');
  }


  private cloneRequest(): VirtualCouponListRequest {

    const dateto = new Date();
    dateto.setDate(this.request.dateTo.getDate() + 1);

    return {
      couponStatus: this.request.couponStatus,
      dateFrom: this.request.dateFrom,
      dateTo: dateto,
      pageSize: this.request.pageSize,
      requestedPage: this.request.requestedPage,
      couponType: this.request.couponType,
      sportId: this.request.sportId === 0 ? null : this.request.sportId,
      product: this.request.product,
      complianceCode: this.request.complianceCode,
      ticketCode: this.request.ticketCode,
      dateHasPlaced: this.request.dateHasPlaced
    };

  }
}
