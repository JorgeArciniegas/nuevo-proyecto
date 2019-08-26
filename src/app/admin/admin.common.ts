import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BetsListComponent } from './reports/bets-list/bets-list.component';
import { SummaryCouponsComponent } from './reports/bets-list/summary-coupons/summary-coupons.component';
import { DetailsCouponComponent } from './reports/bets-list/details-coupon/details-coupon.component';
import { SummaryComponent } from './reports/bets-list/details-coupon/summary/summary.component';
import { EventsComponent } from './reports/bets-list/details-coupon/events/events.component';
import { CombinationsComponent } from './reports/bets-list/details-coupon/combinations/combinations.component';
import { LanguageComponent } from './settings/language/language.component';

export const componentDeclarations: any[] = [
  AdminComponent,
  BetsListComponent,
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
        path: 'settings/languages',
        component: LanguageComponent
      },
      {
        path: 'operators',
        loadChildren: './settings/operators/operators.module#OperatorsModule'
      }
    ]
  },
];
