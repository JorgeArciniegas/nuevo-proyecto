import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SharedModule } from '../shared/shared.module';
import { componentDeclarations, routes } from './admin.common';


@NgModule({
  declarations: [componentDeclarations],
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ]
})
export class AdminModule { }
