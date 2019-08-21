import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { componentDeclarations, routes } from './admin.common';
import { SummaryTransactionsComponent } from './reports/transactions-list/summary-transactions/summary-transactions.component';

@NgModule({
  declarations: [componentDeclarations, SummaryTransactionsComponent],
  imports: [CommonModule, SharedModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, RouterModule.forChild(routes)]
})
export class AdminModule {}
