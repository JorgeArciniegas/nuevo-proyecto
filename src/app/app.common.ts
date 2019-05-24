import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AuthorizationGuard } from './app.authorization.guard';
import { ApplicationMenuComponent } from './component/header/application-menu/application-menu.component';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { UserMenuComponent } from './component/header/user-menu/user-menu.component';
import { WidgetComponent } from './component/widget/widget.component';
import { BtncalcComponent } from './component/btncalc/btncalc.component';
import { DisplayComponent } from './component/display/display.component';
import { AdvanceGameComponent } from './products/advance-game/advance-game.component';
import { CouponComponent } from './component/coupon/coupon.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { AppSettings } from './app.settings';
import { ProductsService } from './products/products.service';
import { BtncalcService } from './component/btncalc/btncalc.service';
import { PayCancelDialogComponent } from './component/coupon/pay-cancel-dialog/pay-cancel-dialog.component';
import { CouponDialogService } from './component/coupon/coupon-dialog.service.tns';
import { PrintCouponComponent } from './component/coupon/print-coupon/print-coupon.component';
import { PrintReceiptComponent } from './component/coupon/pay-cancel-dialog/print-receipt/print-receipt.component';

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
  PrintReceiptComponent
];

export const providerDeclarations: any[] = [
  AppSettings,
  ProductsService,
  TranslateService,
  BtncalcService,
  CouponDialogService
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
        loadChildren: './products/racing/racing.module#RacingModule',
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
