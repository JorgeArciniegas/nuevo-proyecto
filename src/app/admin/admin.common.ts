import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BetsListComponent } from './reports/bets-list/bets-list.component';
import { SummaryCouponsComponent } from './reports/bets-list/summary-coupons/summary-coupons.component';
import { LanguageComponent } from './settings/language/language.component';

export const componentDeclarations: any[] = [AdminComponent, BetsListComponent, SummaryCouponsComponent, LanguageComponent];

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
    path: 'settings/languages',
    component: LanguageComponent
  }
];
