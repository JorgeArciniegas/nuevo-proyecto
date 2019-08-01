import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ElysApiModule } from '@elys/elys-api';
import { ElysCouponModule } from '@elys/elys-coupon';
import { ElysStorageLibModule } from '@elys/elys-storage-lib';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QRCodeModule } from 'angular2-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { environment } from '../environments/environment';
import { VERSION } from '../environments/version';
import { componentDeclarations, providerDeclarations, routes } from './app.common';
import { AppComponent } from './app.component';
import { ConfirmDestroyCouponComponent } from './component/coupon/confirm-destroy-coupon/confirm-destroy-coupon.component';
import { PayCancelDialogComponent } from './component/coupon/pay-cancel-dialog/pay-cancel-dialog.component';
import { DigitslimitPipe } from './component/pipe/digitslimit.pipe';
import { GroupByCategoryPipe } from './component/pipe/groupBy.pipe';
import { LabelByGroupingPipe } from './component/pipe/label-by-grouping.pipe';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { SharedModule } from './shared/shared.module';
// tslint:disable-next-line:only-arrow-functions
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [componentDeclarations, DigitslimitPipe, GroupByCategoryPipe, LabelByGroupingPipe],
  imports: [
    HttpClientModule,
    BrowserModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatSlideToggleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    NgxBarcodeModule,
    QRCodeModule,
    ElysStorageLibModule.forRoot({
      isCrypto: true,
      cryptoString: 'VgenStorage',
      KeyUnencodedList: ['versionApp'],
      versionStorage: VERSION.version
    }),

    ElysApiModule.forRoot({
      urlApi: environment.baseApiUrl
    }),
    ElysCouponModule.forRoot({}),
    RouterModule.forRoot(routes)
  ],
  entryComponents: [ProductDialogComponent, PayCancelDialogComponent, ConfirmDestroyCouponComponent],
  providers: [
    providerDeclarations
    // { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
