import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { componentDeclarations, routes } from './main.common';
import { OverviewComponent } from './playable-board/templates/soccer/overview/overview.component';
import { DetailComponent } from './playable-board/templates/soccer/detail/detail.component';
import { GetArrayFromNumberPipe } from './playable-board/templates/get-array-from-number.pipe';

@NgModule({
  declarations: [componentDeclarations, OverviewComponent, DetailComponent, GetArrayFromNumberPipe],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {}
