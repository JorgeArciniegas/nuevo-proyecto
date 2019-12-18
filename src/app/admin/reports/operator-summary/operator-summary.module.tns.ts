import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { OperatorSummaryListComponent } from './operator-summary-list/operator-summary-list.component';
import { routes } from './operator-summary-routing.module';
import { OperatorSummaryComponent } from './operator-summary.component';



@NgModule({
  declarations: [OperatorSummaryComponent, OperatorSummaryListComponent],
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptRouterModule.forChild(routes)

  ]
})
export class OperatorSummaryModule { }