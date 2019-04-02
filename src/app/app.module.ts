import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './app.httpinterceptor';
import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { BtncalcComponent } from './component/btncalc/btncalc.component';
import { CouponComponent } from './component/coupon/coupon.component';
import { DisplayComponent } from './component/display/display.component';
import { ApplicationMenuComponent } from './component/header/application-menu/application-menu.component';
import { HeaderComponent } from './component/header/header.component';
import { UserMenuComponent } from './component/header/user-menu/user-menu.component';
import { WidgetComponent } from './component/widget/widget.component';
import { AdvanceGameComponent } from './products/advance-game/advance-game.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';
import { SharedModule } from './shared/shared.module';
import { ElysStorageLibModule } from '@elys/elys-storage-lib';
import { VERSION } from '../environments/version';

// tslint:disable-next-line:only-arrow-functions
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
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
    ProductDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NoopAnimationsModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    ElysStorageLibModule.forRoot({
      isCrypto: true,
      cryptoString: 'VgenStorage',
      KeyUnencodedList: ['versionApp'],
      versionStorage: VERSION.version
    }),
    routing
  ],
  entryComponents: [ProductDialogComponent],
  providers: [AppSettings, ProductsService, TranslateService, { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    this.translateService = translateService;
    this.translateService.setDefaultLang('it');
    this.translateService.use('it');
  }
}
