import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '../shared/shared.module';
import { componentDeclarations, routes } from './admin.common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';


@NgModule({
  declarations: [componentDeclarations],
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ]
})
export class AdminModule { }
