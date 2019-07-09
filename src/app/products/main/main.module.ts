import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { componentDeclarations, routes } from './main.common';
import { PlayableBoardCockFightComponent } from './playable-board/templates/playable-board-cock-fight/playable-board-cock-fight.component';
@NgModule({
  declarations: [componentDeclarations, PlayableBoardCockFightComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {}
