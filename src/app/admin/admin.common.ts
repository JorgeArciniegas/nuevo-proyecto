import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BetsListComponent } from './reports/bets-list/bets-list.component';
import { SummaryCouponsComponent } from './reports/bets-list/summary-coupons/summary-coupons.component';
import { DetailsCouponComponent } from './reports/bets-list/details-coupon/details-coupon.component';
import { SummaryComponent } from './reports/bets-list/details-coupon/summary/summary.component';
import { EventsComponent } from './reports/bets-list/details-coupon/events/events.component';
import { CombinationsComponent } from './reports/bets-list/details-coupon/combinations/combinations.component';
import { LanguageComponent } from './settings/language/language.component';
import { TransactionsListComponent } from './reports/transactions-list/transactions-list.component';
import { SummaryTransactionsComponent } from './reports/transactions-list/summary-transactions/summary-transactions.component';
import { DetailsTransactionComponent } from './reports/transactions-list/details-transaction/details-transaction.component';
import { GetTransactionVategoryKeyByEnumValuePipe } from './reports/transactions-list/get-transaction-category-key-by-enum-value.pipe';
import { OperatorSummaryComponent } from './reports/operator-summary/operator-summary.component';
import { OperatorSummaryListComponent } from './reports/operator-summary/operator-summary-list/operator-summary-list.component';
import { AuthorizationGuard } from '../app.authorization.guard';
import { TYPE_ACCOUNT } from '../services/user.models';
import { BetsListService } from './reports/bets-list/bets-list.service';

export const componentDeclarations: any[] = [
  AdminComponent,
  BetsListComponent,
  TransactionsListComponent,
  SummaryCouponsComponent,
  DetailsCouponComponent,
  SummaryComponent,
  EventsComponent,
  CombinationsComponent,
  LanguageComponent,
  SummaryTransactionsComponent,
  DetailsTransactionComponent,
  GetTransactionVategoryKeyByEnumValuePipe,
  OperatorSummaryComponent,
  OperatorSummaryListComponent
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
        children: [
          {
            path: '',
            component: BetsListComponent
          },
          {
            path: 'summaryCoupons',
            component: SummaryCouponsComponent
          },
          {
            path: 'detail/:id',
            component: DetailsCouponComponent
          }
        ]
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
        children: [
          {
            path: '',
            component: OperatorSummaryComponent
          },
          {
            path: 'operatorSummaryList',
            component: OperatorSummaryListComponent
          }
        ],
        canActivateChild: [AuthorizationGuard],
        data: { expectedRole: [TYPE_ACCOUNT.OPERATOR] }
      },
      {
        path: 'reports/statement-vitual-shop',
        loadChildren: './reports/statements-virtual-shop/statements-virtual-shop.module#StatementsVirtualShopModule',
        canActivateChild: [AuthorizationGuard],
        data: { expectedRole: [TYPE_ACCOUNT.OPERATOR] }
      },
      {
        path: 'settings/languages',
        component: LanguageComponent
      },
      {
        path: 'operators',
        loadChildren: './settings/operators/operators.module#OperatorsModule',
        canActivateChild: [AuthorizationGuard],
        data: { expectedRole: [TYPE_ACCOUNT.OPERATOR] }
      },
      {
        path: 'vbox',
        loadChildren: './settings/vbox/vbox.module#VboxModule',
        canActivateChild: [AuthorizationGuard],
        data: { expectedRole: [TYPE_ACCOUNT.OPERATOR] }
      }
    ]
  },
];
