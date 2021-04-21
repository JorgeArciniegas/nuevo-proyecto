import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '../../../shared/shared.module';
import { OperatorSummaryListComponent } from './operator-summary-list/operator-summary-list.component';
import { routes } from './operator-summary-routing.module';
import { OperatorSummaryComponent } from './operator-summary.component';
import { OperatorSummaryService } from './operator-summary.service';



@NgModule({
  declarations: [OperatorSummaryComponent, OperatorSummaryListComponent],
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptRouterModule.forChild(routes)

  ],
  providers: [OperatorSummaryService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class OperatorSummaryModule { }
