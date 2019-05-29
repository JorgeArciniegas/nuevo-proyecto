import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponCategory, ElysApiService, SummaryCouponRequest } from '@elys/elys-api';
import { Subscription } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { ShowBetDetailView } from '../bets-list.model';
import { SummaryCouponExtended } from './detail-coupon.model';

@Component({
  selector: 'app-details-coupon',
  templateUrl: './details-coupon.component.html',
  styleUrls: ['./details-coupon.component.scss']
})
export class DetailsCouponComponent implements OnInit, OnDestroy {

  routingSub: Subscription;
  couponDetail: SummaryCouponExtended;
  showDataViewSelected: ShowBetDetailView;
  showBetDetailView: typeof ShowBetDetailView = ShowBetDetailView;
  constructor(
     private route: ActivatedRoute,
     private elysApi: ElysApiService,
     public readonly settings: AppSettings
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
      });
   });
  }

  ngOnDestroy() {
    this.routingSub.unsubscribe();
  }

  changeView(view:  ShowBetDetailView): void  {
    console.log(view);
    this.showDataViewSelected = view;
  }
}
