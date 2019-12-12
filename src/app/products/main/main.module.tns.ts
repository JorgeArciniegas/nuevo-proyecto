import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes, componentDeclarations } from './main.common';
import { RmSelFromMarketPipe } from './playable-board/rm-sel-from-market.pipe.tns';
import { GetNumColOverviewPipe } from './playable-board/templates/soccer/get-num-col-overview.pipe';
import { GetGridStringSettingPipe } from './playable-board/get-grid-string-setting.pipe';
import { GetNumGridElemDetailPipe } from './playable-board/templates/soccer/detail/get-num-grid-elem-detail.pipe';
import { SoccerService } from './playable-board/templates/soccer/soccer.service';

@NgModule({
  declarations: [componentDeclarations, RmSelFromMarketPipe, GetNumColOverviewPipe, GetGridStringSettingPipe, GetNumGridElemDetailPipe],
  imports: [NativeScriptCommonModule, SharedModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [SoccerService]
})
export class MainModule { }
