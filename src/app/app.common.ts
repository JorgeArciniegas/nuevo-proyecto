import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localePt from '@angular/common/locales/pt';
import localeSq from '@angular/common/locales/sq';
import { LOCALE_ID } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrintOperatorSummaryComponent } from './admin/reports/operator-summary/operator-summary-list/print-operator-summary/print-operator-summary.component';
import { AuthorizationGuard } from './app.authorization.guard';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './app.httpinterceptor';
import { AppSettings } from './app.settings';
import { BtncalcService } from './component/btncalc/btncalc.service';
import { ConfirmDestroyCouponComponent } from './component/coupon/confirm-destroy-coupon/confirm-destroy-coupon.component';
import { CouponDialogService } from './component/coupon/coupon-dialog.service';
import { CouponService } from './component/coupon/coupon.service';
import { PrintReceiptComponent } from './component/coupon/pay-cancel-dialog/print-receipt/print-receipt.component';
import { PrintCouponComponent } from './component/coupon/print-coupon/print-coupon.component';
import { ApplicationMenuComponent } from './component/header/application-menu/application-menu.component';
import { HeaderComponent } from './component/header/header.component';
import { UserMenuComponent } from './component/header/user-menu/user-menu.component';
import { LoaderComponent } from './component/loader/loader.component';
import { LabelByGroupingPipe } from './component/pipe/label-by-grouping.pipe';
import { GroupingsComponent } from './products/product-dialog/groupings/groupings.component';
// Registration of the languages in use. The English language is registered by default.
registerLocaleData(localeIt);
registerLocaleData(localeFr);
registerLocaleData(localeEs);
registerLocaleData(localePt);
registerLocaleData(localeSq);
registerLocaleData(localeDe);

export const componentDeclarations: any[] = [
  AppComponent,
  HeaderComponent,
  UserMenuComponent,
  ApplicationMenuComponent,
  PrintCouponComponent,
  PrintReceiptComponent,
  ConfirmDestroyCouponComponent,
  GroupingsComponent,
  LabelByGroupingPipe,
  PrintOperatorSummaryComponent,
  LoaderComponent,
];

export const providerDeclarations: any[] = [
  AppSettings,
  TranslateService,
  {
    provide: LOCALE_ID,
    deps: [TranslateService],
    // tslint:disable-next-line:typedef
    useFactory: (confService: TranslateService) => confService.currentLang
  },
  { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  CouponService,
  BtncalcService,
  CouponDialogService
];

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [AuthorizationGuard]
  },
  /**
   * Routing used without login interactive
   */
  {
    path: 'extclient/:token/:language/:homeURL/:loginType',
    loadChildren: () => import('./extclient/extclient.module').then(m => m.ExtclientModule),
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
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthorizationGuard],
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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule),
  }
];
