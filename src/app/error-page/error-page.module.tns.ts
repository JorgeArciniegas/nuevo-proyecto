import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { routes, componentDeclarations } from './error-page.common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

@NgModule({
  declarations: [componentDeclarations],
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ErrorPageModule {}
