import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LoginComponent } from './login.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from './login.common';

@NgModule({
  declarations: [LoginComponent],
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule {}
