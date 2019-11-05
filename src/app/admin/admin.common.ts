import { Routes } from '@angular/router';
import { AuthorizationGuard } from '../app.authorization.guard';
import { TYPE_ACCOUNT } from '../services/user.models';
import { AdminComponent } from './admin.component';
import { DetailsTransactionComponent } from './reports/transactions-list/details-transaction/details-transaction.component';
import { GetTransactionVategoryKeyByEnumValuePipe } from './reports/transactions-list/get-transaction-category-key-by-enum-value.pipe';
import { SummaryTransactionsComponent } from './reports/transactions-list/summary-transactions/summary-transactions.component';
import { TransactionsListComponent } from './reports/transactions-list/transactions-list.component';
import { LanguageComponent } from './settings/language/language.component';

export const componentDeclarations: any[] = [
  AdminComponent,
  TransactionsListComponent,

  LanguageComponent,
  SummaryTransactionsComponent,
  DetailsTransactionComponent,
  GetTransactionVategoryKeyByEnumValuePipe,
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminComponent,
      },
      {
        path: 'reports/betsList',
        loadChildren: () =>
          import('./reports/bets-list/bets-list.module').then(
            m => m.BetsListModule
          ),
        canActivateChild: [AuthorizationGuard],
        data: { expectedRole: [TYPE_ACCOUNT.OPERATOR, TYPE_ACCOUNT.ADMIN] }
      },
      {
        path: 'reports/transactionsList',
        children: [
          {
            path: '',
            component: TransactionsListComponent
          },
          {
            path: 'summaryTransactions',
            component: SummaryTransactionsComponent
          },
          {
            path: 'detail/:id',
            component: DetailsTransactionComponent
          }
        ],
        canActivateChild: [AuthorizationGuard],
        data: { expectedRole: [TYPE_ACCOUNT.OPERATOR] }
      },
      {
        path: 'reports/operatorSummary',
        loadChildren: () =>
          import('./reports/operator-summary/operator-summary.module').then(
            m => m.OperatorSummaryModule
          ),
        canActivateChild: [AuthorizationGuard],
        data: { expectedRole: [TYPE_ACCOUNT.OPERATOR] }
      },
      {
        path: 'reports/statement-vitual-shop',
        loadChildren: () =>
          import('./reports/statements-virtual-shop/statements-virtual-shop.module').then(
            m => m.StatementsVirtualShopModule
          ),
        canActivateChild: [AuthorizationGuard],
        data: { expectedRole: [TYPE_ACCOUNT.OPERATOR] }
      },
      {
        path: 'settings/languages',
        component: LanguageComponent
      },
      {
        path: 'operators',
        loadChildren: () =>
          import('./settings/operators/operators.module').then(
            m => m.OperatorsModule
          ),
        canActivateChild: [AuthorizationGuard],
        data: { expectedRole: [TYPE_ACCOUNT.OPERATOR] }
      },
      {
        path: 'vbox',
        loadChildren: () => import('./settings/vbox/vbox.module').then(m => m.VboxModule)
      }
    ]
  },
];
