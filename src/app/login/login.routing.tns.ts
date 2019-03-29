import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { loginRoutes } from './login.routes';

@NgModule({
  imports: [NativeScriptRouterModule.forChild(loginRoutes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
