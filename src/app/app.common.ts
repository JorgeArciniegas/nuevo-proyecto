import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localePt from '@angular/common/locales/pt';
import localeSq from '@angular/common/locales/sq';
import { LOCALE_ID } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// tslint:disable-next-line:max-line-length
import { PrintOperatorSummaryComponent } from './admin/reports/operator-summary/operator-summary-list/print-operator-summary/print-operator-summary.component';
import { AuthorizationGuard } from './app.authorization.guard';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { BtncalcComponent } from './component/btncalc/btncalc.component';
import { BtncalcService } from './component/btncalc/btncalc.service';
import { ConfirmDestroyCouponComponent } from './component/coupon/confirm-destroy-coupon/confirm-destroy-coupon.component';
import { CouponDialogService } from './component/coupon/coupon-dialog.service.tns';
import { CouponComponent } from './component/coupon/coupon.component';
import { PayCancelDialogComponent } from './component/coupon/pay-cancel-dialog/pay-cancel-dialog.component';
import { PrintReceiptComponent } from './component/coupon/pay-cancel-dialog/print-receipt/print-receipt.component';
import { PrintCouponComponent } from './component/coupon/print-coupon/print-coupon.component';
import { DisplayComponent } from './component/display/display.component';
import { ApplicationMenuComponent } from './component/header/application-menu/application-menu.component';
import { HeaderComponent } from './component/header/header.component';
import { UserMenuComponent } from './component/header/user-menu/user-menu.component';
import { LabelByGroupingPipe } from './component/pipe/label-by-grouping.pipe';
import { WidgetComponent } from './component/widget/widget.component';
import { AdvanceGameComponent } from './products/advance-game/advance-game.component';
import { BetoddsComponent } from './products/product-dialog/betodds/betodds.component';
import { GroupingsComponent } from './products/product-dialog/groupings/groupings.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { RankingComponent } from './products/product-dialog/ranking/ranking.component';
import { SoccerComponent as SoccerRankingComponent } from './products/product-dialog/ranking/templates/soccer/soccer.component';
import { StatisticsComponent } from './products/product-dialog/statistics/statistics.component';
// tslint:disable-next-line:max-line-length
import { CockFightComponent as CockFightStatisticsComponent } from './products/product-dialog/statistics/templates/cock-fight/cock-fight.component';
import { RaceComponent as RaceStatisticsComponent } from './products/product-dialog/statistics/templates/race/race.component';
import { SoccerComponent as SoccerStatisticsComponent } from './products/product-dialog/statistics/templates/soccer/soccer.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';
import { CouponService } from './component/coupon/coupon.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './app.httpinterceptor';
import { LoaderComponent } from './services/utility/loader/loader.component';



// Registration of the languages in use. The English language is registered by default.
registerLocaleData(localeIt);
registerLocaleData(localeFr);
registerLocaleData(localeEs);
registerLocaleData(localePt);
registerLocaleData(localeSq);
registerLocaleData(localeDe);

export const componentDeclarations: any[] = [
  AppComponent,
  ProductsComponent,
  HeaderComponent,
  UserMenuComponent,
  ApplicationMenuComponent,
  WidgetComponent,
  BtncalcComponent,
  DisplayComponent,
  AdvanceGameComponent,
  CouponComponent,
  ProductDialogComponent,
  PayCancelDialogComponent,
  PrintCouponComponent,
  PrintReceiptComponent,
  ConfirmDestroyCouponComponent,
  BetoddsComponent,
  StatisticsComponent,
  RaceStatisticsComponent,
  CockFightStatisticsComponent,
  SoccerStatisticsComponent,
  GroupingsComponent,
  RankingComponent,
  SoccerRankingComponent,
  LabelByGroupingPipe,
  PrintOperatorSummaryComponent,
  LoaderComponent
];

export const providerDeclarations: any[] = [
  AppSettings,
  TranslateService,
  CouponService,
  BtncalcService,
  ProductsService,
  CouponDialogService,
  {
    provide: LOCALE_ID,
    deps: [TranslateService],
    // tslint:disable-next-line:typedef
    useFactory: (confService: TranslateService) => confService.currentLang
  },
  { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
];

export const routes: Routes = [
  {
    path: 'login',
    // loadChildren: './login/login.module#LoginModule',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'print-coupon',
    component: PrintCouponComponent,
    outlet: 'print'
  },
  {
    path: 'print-receipt',
    component: PrintReceiptComponent,
    outlet: 'print'
  },
  {
    path: 'print-operator-summary',
    component: PrintOperatorSummaryComponent,
    outlet: 'print'
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'main',
        loadChildren: () => import('./products/main/main.module').then(m => m.MainModule),
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'error-page',
    loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule),
  },
  {
    path: '**',
    loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule),
  }
];
