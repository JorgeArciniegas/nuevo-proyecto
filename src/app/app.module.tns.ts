import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { componentDeclarations, providerDeclarations, routes } from './app.common';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './app.httpinterceptor';
import { FloorPipe } from './component/pipe/floor.pipe';
import { SharedModule } from './shared/shared.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [componentDeclarations, FloorPipe],
  imports: [
    NativeScriptHttpClientModule,
    NativeScriptModule,
    FlexLayoutModule,
    NgShadowModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  providers: [providerDeclarations, { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }],
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
