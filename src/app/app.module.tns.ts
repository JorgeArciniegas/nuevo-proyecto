import { HttpClient } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ElysApiModule } from '@elys/elys-api';
import { ElysCouponModule } from '@elys/elys-coupon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { environment } from '../environments/environment';
import { componentDeclarations, providerDeclarations, routes } from './app.common';
import { AppComponent } from './app.component';
import { DigitslimitPipe } from './component/pipe/digitslimit.pipe';
import { GroupByCategoryPipe } from './component/pipe/groupBy.pipe';
import { SharedModule } from './shared/shared.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [componentDeclarations, DigitslimitPipe, GroupByCategoryPipe],
  imports: [
    NativeScriptHttpClientModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    FlexLayoutModule,
    NgShadowModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ElysApiModule.forRoot({
      urlApi: environment.baseApiUrl
    }),
    ElysCouponModule.forRoot({}),
    SharedModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  providers: [
    providerDeclarations
    /* { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true } */
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
