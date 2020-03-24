import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SharedModule } from '../../shared/shared.module';
import { componentDeclarations, routes } from './main.common';
import { GetGridStringSettingPipe } from './playable-board/get-grid-string-setting.pipe';
import { RmSelFromMarketPipe } from './playable-board/rm-sel-from-market.pipe';
import { GetNumGridElemDetailPipe } from './playable-board/templates/soccer/detail/get-num-grid-elem-detail.pipe';
import { GetNumColOverviewPipe } from './playable-board/templates/soccer/get-num-col-overview.pipe';
import { SoccerService } from './playable-board/templates/soccer/soccer.service';

@NgModule({
  declarations: [componentDeclarations, RmSelFromMarketPipe, GetNumColOverviewPipe, GetGridStringSettingPipe, GetNumGridElemDetailPipe],
  imports: [NativeScriptCommonModule, SharedModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [SoccerService]
})
export class MainModule { }
