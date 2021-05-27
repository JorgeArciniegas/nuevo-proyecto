import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { routes, componentDeclarations } from './error-page.common';

@NgModule({
  declarations: [componentDeclarations],
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ErrorPageModule {}
