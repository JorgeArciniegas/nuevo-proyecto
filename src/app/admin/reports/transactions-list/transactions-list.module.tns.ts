import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '../../../shared/shared.module';
import { DetailsTransactionComponent } from './details-transaction/details-transaction.component';
import { GetTransactionVategoryKeyByEnumValuePipe } from './get-transaction-category-key-by-enum-value.pipe';
import { SummaryTransactionsComponent } from './summary-transactions/summary-transactions.component';
import { routes } from './transactions-list-routing.module';
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
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  providers: [TransactionsListService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TransactionsListModule { }
