import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '../shared/shared.module';
import { componentDeclarations, routes } from './login.common';

@NgModule({
  declarations: [componentDeclarations],
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, SharedModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
