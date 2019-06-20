import { Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationGuard } from './app.authorization.guard';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { BtncalcComponent } from './component/btncalc/btncalc.component';
import { BtncalcService } from './component/btncalc/btncalc.service';
import { CouponDialogService } from './component/coupon/coupon-dialog.service.tns';
import { CouponComponent } from './component/coupon/coupon.component';
import { PayCancelDialogComponent } from './component/coupon/pay-cancel-dialog/pay-cancel-dialog.component';
import { PrintReceiptComponent } from './component/coupon/pay-cancel-dialog/print-receipt/print-receipt.component';
import { PrintCouponComponent } from './component/coupon/print-coupon/print-coupon.component';
import { DisplayComponent } from './component/display/display.component';
import { ApplicationMenuComponent } from './component/header/application-menu/application-menu.component';
import { HeaderComponent } from './component/header/header.component';
import { UserMenuComponent } from './component/header/user-menu/user-menu.component';
import { WidgetComponent } from './component/widget/widget.component';
import { AdvanceGameComponent } from './products/advance-game/advance-game.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';
import { ConfirmDestroyCouponComponent } from './component/coupon/confirm-destroy-coupon/confirm-destroy-coupon.component';
import { DestroyCouponService } from './component/coupon/confirm-destroy-coupon/destroy-coupon.service';
import { BetoddsComponent } from './products/product-dialog/betodds/betodds.component';
import { StatisticsComponent } from './products/product-dialog/statistics/statistics.component';

import { LOCALE_ID } from '@angular/core';
import localeIt from '@angular/common/locales/it';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localePt from '@angular/common/locales/pt';
import localeSq from '@angular/common/locales/sq';
import localeDe from '@angular/common/locales/de';

import { registerLocaleData } from '@angular/common';

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
  StatisticsComponent
];

export const providerDeclarations: any[] = [
  AppSettings,
  ProductsService,
  TranslateService,
  BtncalcService,
  CouponDialogService,
  DestroyCouponService,
  {
    provide: LOCALE_ID,
    deps: [TranslateService],
    // tslint:disable-next-line:typedef
    useFactory: (confService: TranslateService) => confService.currentLang
  }
];

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
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
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'racing',
        loadChildren: './products/racing/racing.module#RacingModule'
      },
      {
        path: '',
        redirectTo: 'racing',
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
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthorizationGuard]
  },
  {
    path: '**',
    loadChildren: './error-page/error-page.module#ErrorPageModule'
  }
];
