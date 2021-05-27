import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '../../shared/shared.module';
import { componentDeclarations, routes } from './main.common';
import { GetGridStringSettingPipe } from './playable-board/get-grid-string-setting.pipe.tns';
import { RmSelFromMarketPipe } from './playable-board/rm-sel-from-market.pipe.tns';
import { GetNumGridElemDetailPipe } from './playable-board/templates/soccer/detail/get-num-grid-elem-detail.pipe.tns';
import { GetNumColOverviewPipe } from './playable-board/templates/soccer/get-num-col-overview.pipe.tns';
import { SoccerService } from './playable-board/templates/soccer/soccer.service';

@NgModule({
  declarations: [componentDeclarations, RmSelFromMarketPipe, GetNumColOverviewPipe, GetGridStringSettingPipe, GetNumGridElemDetailPipe],
  imports: [NativeScriptCommonModule, SharedModule, NativeScriptRouterModule.forChild(routes)],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [SoccerService]
})
export class MainModule { }
