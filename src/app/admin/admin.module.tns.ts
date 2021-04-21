import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '../shared/shared.module';
import { componentDeclarations, routes } from './admin.common';
import { OperatorsService } from './settings/operators/operators.service';


@NgModule({
  declarations: [componentDeclarations],
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  providers: [OperatorsService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AdminModule { }
