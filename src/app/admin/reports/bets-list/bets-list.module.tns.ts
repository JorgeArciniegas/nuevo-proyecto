import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { BetsListComponent } from './bets-list.component';
import { CombinationsComponent } from './details-coupon/combinations/combinations.component';
import { DetailsCouponComponent } from './details-coupon/details-coupon.component';
import { EventsComponent } from './details-coupon/events/events.component';
import { SummaryComponent } from './details-coupon/summary/summary.component';
import { SummaryCouponsComponent } from './summary-coupons/summary-coupons.component';
import { routes } from './bets-list-routing.module';
/**
 *
 */
@NgModule({
  declarations: [
    BetsListComponent,
    DetailsCouponComponent,
    SummaryCouponsComponent,
    CombinationsComponent,
    SummaryComponent,
    EventsComponent
  ],
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild(routes)
  ]
})
export class BetsListModule { }
