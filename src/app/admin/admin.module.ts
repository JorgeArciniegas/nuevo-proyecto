import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BetsListComponent } from './reports/bets-list/bets-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { SummaryCouponsComponent } from './reports/bets-list/summary-coupons/summary-coupons.component';


@NgModule({
  declarations: [AdminComponent, BetsListComponent, SummaryCouponsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ]
})
export class AdminModule { }
