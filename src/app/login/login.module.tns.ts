import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SharedModule } from '../shared/shared.module';
import { componentDeclarations, routes } from './login.common';

@NgModule({
  declarations: [componentDeclarations],
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, SharedModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
