import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
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
import { DogracingComponent } from './products/dogracing/dogracing.component';
import { RaceControlComponent } from './products/dogracing/race-control/race-control.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';
import { ListRaceComponent } from './products/dogracing/list-race/list-race.component';

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
    DogracingComponent,
    WidgetComponent,
    BtncalcComponent,
    DisplayComponent,
    AdvanceGameComponent,
    CouponComponent,
    RaceControlComponent,
    ListRaceComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FlexLayoutModule,
    routing,
    MatGridListModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CommonModule
  ],
  providers: [AppSettings, ProductsService, TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    this.translateService = translateService;
    this.translateService.setDefaultLang('it');
    this.translateService.use('it');
  }
}
