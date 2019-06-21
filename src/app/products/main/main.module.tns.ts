import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes, componentDeclarations } from './main.common';
import { RaceComponent } from './results/templates/race/race.component';

@NgModule({
  declarations: [
    componentDeclarations,
    RaceComponent
  ],
  imports: [NativeScriptCommonModule, SharedModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MainModule { }
