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

export const componentDeclarations: any[] = [
  AdminComponent,
  BetsListComponent,
  TransactionsListComponent,
  SummaryCouponsComponent,
  DetailsCouponComponent,
  SummaryComponent,
  EventsComponent,
  CombinationsComponent,
  LanguageComponent
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'reports/betsList',
    component: BetsListComponent
  },
  {
    path: 'reports/betsList/summaryCoupons',
    component: SummaryCouponsComponent
  },
  {
    path: 'reports/betsList/detail/:id',
    component: DetailsCouponComponent
  },
  {
    path: 'reports/transactionsList',
    component: TransactionsListComponent
  },
  {
    path: 'reports/transactionsList/summaryTransactions',
    component: SummaryTransactionsComponent
  },
  {
    path: 'settings/languages',
    component: LanguageComponent
  }
];
