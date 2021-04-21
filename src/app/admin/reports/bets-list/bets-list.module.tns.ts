import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BetsListComponent } from './bets-list.component';
import { CombinationsComponent } from './details-coupon/combinations/combinations.component';
import { DetailsCouponComponent } from './details-coupon/details-coupon.component';
import { EventsComponent } from './details-coupon/events/events.component';
import { SummaryComponent } from './details-coupon/summary/summary.component';
import { SummaryCouponsComponent } from './summary-coupons/summary-coupons.component';
import { routes } from './bets-list-routing.module';
import { BetsListService } from './bets-list.service';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  providers: [BetsListService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BetsListModule { }
