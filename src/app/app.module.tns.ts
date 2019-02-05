import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './app.httpinterceptor';
import { AppRoutingModule } from './app.routing.tns';
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
import { ListRaceComponent } from './products/dogracing/list-race/list-race.component';
import { FilterByPositionPipe } from './products/dogracing/playable-board/filter-by-position.pipe';
import { PlayableBoardComponent } from './products/dogracing/playable-board/playable-board.component';
import { RaceControlComponent } from './products/dogracing/race-control/race-control.component';
import { ResultListComponent } from './products/dogracing/result-list/result-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';

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
    ListRaceComponent,
    ResultListComponent,
    PlayableBoardComponent,
    ListRaceComponent,
    FilterByPositionPipe
  ],
  imports: [
    NativeScriptHttpClientModule,
    NativeScriptModule,
    AppRoutingModule,
    FlexLayoutModule,
    NgShadowModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AppSettings,
    ProductsService,
    TranslateService,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
  constructor(private translateService: TranslateService) {
    this.translateService = translateService;
    this.translateService.setDefaultLang('it');
    this.translateService.use('it');
  }
}
