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
  ConfirmDestroyCouponComponent
];

export const providerDeclarations: any[] = [
  AppSettings,
  ProductsService,
  TranslateService,
  BtncalcService,
  CouponDialogService,
  DestroyCouponService
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
  /* {
    path: 'destroycoupon',
    component: ConfirmDestroyCouponComponent,
    outlet: 'outletprd'
  }, */
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
        path: 'destroycoupon',
        component: ConfirmDestroyCouponComponent
      },
      {
        path: '',
        redirectTo: 'racing',
        pathMatch: 'full',
      }
    ],

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
