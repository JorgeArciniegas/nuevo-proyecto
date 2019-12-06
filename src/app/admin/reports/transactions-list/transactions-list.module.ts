import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { DetailsTransactionComponent } from './details-transaction/details-transaction.component';
import { GetTransactionVategoryKeyByEnumValuePipe } from './get-transaction-category-key-by-enum-value.pipe';
import { SummaryTransactionsComponent } from './summary-transactions/summary-transactions.component';
import { TransactionsListRoutingModule } from './transactions-list-routing.module';
import { TransactionsListComponent } from './transactions-list.component';
import { TransactionsListService } from './transactions-list.service';

@NgModule({
  declarations: [
    TransactionsListComponent,
    DetailsTransactionComponent,
    SummaryTransactionsComponent,
    GetTransactionVategoryKeyByEnumValuePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionsListRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [TransactionsListService]
})
export class TransactionsListModule { }
