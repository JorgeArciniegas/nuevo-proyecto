import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule, MatSlideToggleModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ElysApiModule, PlaySource } from '@elys/elys-api';
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
import { SharedModule } from './shared/shared.module';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { BetoddsComponent } from './products/product-dialog/betodds/betodds.component';
import { StatisticsComponent } from './products/product-dialog/statistics/statistics.component';
import { CockFightComponent as CockFightStatisticsComponent } from './products/product-dialog/statistics/templates/cock-fight/cock-fight.component';
import { RaceComponent as RaceStatisticsComponent } from './products/product-dialog/statistics/templates/race/race.component';
import { SoccerComponent as SoccerStatisticsComponent } from './products/product-dialog/statistics/templates/soccer/soccer.component';
import { HotAndColdComponent } from './products/product-dialog/hot-and-cold/hot-and-cold.component';
import { KenoComponent as KenoHotAndColdComponent } from './products/product-dialog/hot-and-cold/template/keno/keno.component';
import { PaytableComponent } from './products/product-dialog/paytable/paytable.component';
import { KenoComponent as KenoPaytableComponent } from './products/product-dialog/paytable/template/keno/keno.component';
import { RankingComponent } from './products/product-dialog/ranking/ranking.component';
import { SoccerComponent as SoccerRankingComponent } from './products/product-dialog/ranking/templates/soccer/soccer.component';
import { PayCancelDialogComponent } from './component/coupon/pay-cancel-dialog/pay-cancel-dialog.component';


// tslint:disable-next-line:only-arrow-functions
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    componentDeclarations,
    ProductDialogComponent,
    BetoddsComponent,
    StatisticsComponent,
    RaceStatisticsComponent,
    CockFightStatisticsComponent,
    SoccerStatisticsComponent,
    PaytableComponent,
    RankingComponent,
    SoccerRankingComponent,
    KenoPaytableComponent,
    HotAndColdComponent,
    KenoHotAndColdComponent,
    PayCancelDialogComponent
  ],
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
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    SharedModule,
    NgxBarcodeModule,
    QRCodeModule,
    ElysStorageLibModule.forRoot({
      isCrypto: true,
      cryptoString: 'VgenStorage',
      KeyUnencodedList: ['versionApp', 'operatorData'],
      versionStorage: VERSION.version
    }),

    ElysApiModule.forRoot({
      urlApi: environment.baseApiUrl
    }),
    ElysCouponModule.forRoot(
      { deviceLayout: PlaySource.VDeskWeb }
    ),
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    ProductDialogComponent,
    ConfirmDestroyCouponComponent,
    PayCancelDialogComponent
  ],
  providers: [
    providerDeclarations
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
