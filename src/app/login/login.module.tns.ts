import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from './login.routing.tns';

@NgModule({
  declarations: [LoginComponent],
  imports: [NativeScriptCommonModule, AppRoutingModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule {}
