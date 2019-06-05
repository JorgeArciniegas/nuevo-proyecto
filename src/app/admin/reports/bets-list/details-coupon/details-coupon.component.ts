import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponCategory, ElysApiService, SummaryCoupon, SummaryCouponRequest } from '@elys/elys-api';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../../../../../src/app/app.settings';
import { ShowBetDetailView } from '../bets-list.model';
import { GroupingsRows, OddsEventRows } from './detail-coupon.model';
import { PrintCouponService } from '../../../../../../src/app/component/coupon/print-coupon/print-coupon.service';

@Component({
  selector: 'app-details-coupon',
  templateUrl: './details-coupon.component.html',
  styleUrls: ['./details-coupon.component.scss']
})
export class DetailsCouponComponent implements OnInit, OnDestroy {
  private definedNumberRowForEvents = 3;
  private definedNumberRowForGroupings = 5;
  routingSub: Subscription;
  couponDetail: SummaryCoupon;
  showDataViewSelected: ShowBetDetailView;
  showBetDetailView: typeof ShowBetDetailView = ShowBetDetailView;

  couponOddEvent: OddsEventRows;
  couponGroupingsRow: GroupingsRows;
  constructor(
     private route: ActivatedRoute,
     private elysApi: ElysApiService,
     public readonly settings: AppSettings,
     private printService: PrintCouponService
     ) {
      this.showDataViewSelected = ShowBetDetailView.SUMMARY;
     }

  ngOnInit() {
    this.routingSub = this.route.params.subscribe( params => {
      const req: SummaryCouponRequest = {
        CouponCategory: CouponCategory.Virtual,
        IdOrCode:  params.id
      };
      this.elysApi.coupon.getCouponDetail(req).then( items => {
        this.couponDetail = items;
        // setting paginator for events
        this.couponOddEvent = {
          couponStatus: this.couponDetail.CouponStatusId,
          pageOdd: 1,
          pageOddRows: this.definedNumberRowForEvents,
          maxPage: this.couponDetail.Odds.length === 1 ? 1 : Math.round(this.couponDetail.Odds.length / this.definedNumberRowForEvents),

          odd: this.couponDetail.Odds.slice(0, this.definedNumberRowForEvents )
        };
        // setting paginator for combinations
        this.couponGroupingsRow = {
          groupings: this.couponDetail.Groupings,
          pageGrouping: 1,
          pageGroupingRows: this.definedNumberRowForGroupings,
          maxPage: this.couponDetail.Groupings.length === 1 ?
            1 : Math.floor(this.couponDetail.Groupings.length / this.definedNumberRowForGroupings)
        };
      });
   });
  }

  changePage(page: boolean): void {
    if (page) {
      if (this.showDataViewSelected === ShowBetDetailView.EVENTS) {
        this.couponOddEvent.odd = this.couponDetail.Odds.slice(
          this.couponOddEvent.pageOdd * this.definedNumberRowForEvents,
          (this.couponOddEvent.pageOdd + 1 ) * this.definedNumberRowForEvents );
        this.couponOddEvent.pageOdd++;
      } else if (
        this.showDataViewSelected === ShowBetDetailView.COMBINATIONS
      ) {
        this.couponGroupingsRow.groupings = this.couponDetail.Groupings.slice(
          this.couponGroupingsRow.pageGrouping * this.definedNumberRowForGroupings,
        );
        this.couponGroupingsRow.pageGrouping++;
      }
    } else {
      if (this.showDataViewSelected === ShowBetDetailView.EVENTS) {
        this.couponOddEvent.odd = this.couponDetail.Odds.slice(
          ((this.couponOddEvent.pageOdd - 1 ) > 1) ? (this.couponOddEvent.pageOdd - 1 ) * this.definedNumberRowForEvents : 0,
          (this.couponOddEvent.pageOdd - 1 ) * this.definedNumberRowForEvents );
        this.couponOddEvent.pageOdd--;
      } else if (
        this.showDataViewSelected === ShowBetDetailView.COMBINATIONS
      ) {
        this.couponGroupingsRow.groupings = this.couponDetail.Groupings.slice(
          this.couponGroupingsRow.pageGrouping - 1 > 1 ?
          (this.couponGroupingsRow.pageGrouping - 1) * this.definedNumberRowForGroupings : 0,
          (this.couponGroupingsRow.pageGrouping - 1) *
            this.definedNumberRowForGroupings
        );
        this.couponGroupingsRow.pageGrouping--;
      }
    }
  }

  ngOnDestroy() {
    this.routingSub.unsubscribe();
  }

  changeView(view:  ShowBetDetailView): void  {
    this.showDataViewSelected = view;
  }

  printAgainCoupon( ): void {
    this.printService.reprintCoupon( this.couponDetail );
  }

}
