import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ErrorPageComponent } from './error-page.component';
import { routes } from './error-page.common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ErrorPageModule {}
