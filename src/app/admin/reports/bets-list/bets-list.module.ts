import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { BetsListRoutingModule } from './bets-list-routing.module';
import { BetsListComponent } from './bets-list.component';
import { CombinationsComponent } from './details-coupon/combinations/combinations.component';
import { DetailsCouponComponent } from './details-coupon/details-coupon.component';
import { EventsComponent } from './details-coupon/events/events.component';
import { SummaryComponent } from './details-coupon/summary/summary.component';
import { SummaryCouponsComponent } from './summary-coupons/summary-coupons.component';

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
    BetsListRoutingModule,
    SharedModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule
  ]
})
export class BetsListModule { }
