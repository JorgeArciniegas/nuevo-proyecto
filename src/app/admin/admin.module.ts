import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { componentDeclarations, routes } from './admin.common';
import { SummaryComponent } from './reports/bets-list/details-coupon/summary/summary.component';
import { EventsComponent } from './reports/bets-list/details-coupon/events/events.component';
import { CombinationsComponent } from './reports/bets-list/details-coupon/combinations/combinations.component';


@NgModule({
  declarations: [componentDeclarations, SummaryComponent, EventsComponent, CombinationsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
