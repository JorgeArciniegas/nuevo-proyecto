import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ElysStorageLibModule } from '@elys/elys-storage-lib';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { VERSION } from '../environments/version';
import { componentDeclarations, providerDeclarations, routes } from './app.common';
import { AppComponent } from './app.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { ElysApiModule } from '@elys/elys-api';
import { ElysCouponModule, ElysCouponService } from '@elys/elys-coupon';
import { UserService } from './services/user.service';
import { CouponDataConfig } from '@elys/elys-coupon/lib/elys-coupon.models';
// tslint:disable-next-line:only-arrow-functions
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [componentDeclarations],
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

    ElysApiModule.forRoot( {
      language: 'en',
      urlApi: environment.baseApiUrl
    }),
    ElysCouponModule.forRoot({
      language: 'en'
    }),
    RouterModule.forRoot(routes)
  ],
  entryComponents: [ProductDialogComponent],
  providers: [
    providerDeclarations,
    // { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    this.translateService = translateService;
    this.translateService.setDefaultLang('it');
    this.translateService.use('it');
  }
}
