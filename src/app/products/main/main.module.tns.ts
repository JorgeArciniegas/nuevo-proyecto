import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes, componentDeclarations } from './main.common';
import { RmSelFromMarketPipe } from './playable-board/rm-sel-from-market.pipe';
import { GetNumColOverviewPipe } from './playable-board/templates/soccer/get-num-col-overview.pipe';

@NgModule({
  declarations: [componentDeclarations, RmSelFromMarketPipe, GetNumColOverviewPipe],
  imports: [NativeScriptCommonModule, SharedModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MainModule {}
