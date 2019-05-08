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
  PayCancelDialogComponent
];

export const providerDeclarations: any[] = [
  AppSettings,
  ProductsService,
  TranslateService,
  BtncalcService
];

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'dogracing',
        loadChildren: './products/dogracing/dogracing.module#DogracingModule',
        data: { productName: 'dogracing' }
      },
      {
        path: '',
        redirectTo: 'dogracing',
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
    path: '**',
    loadChildren: './error-page/error-page.module#ErrorPageModule'
  }
];
