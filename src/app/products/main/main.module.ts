import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { componentDeclarations, routes } from './main.common';
import { GetArrayFromNumberPipe } from './playable-board/templates/get-array-from-number.pipe';
import { FilterMarketsByAreaColumnPipe } from './playable-board/filter-markets-by-area-column.pipe';

@NgModule({
  declarations: [componentDeclarations, GetArrayFromNumberPipe, FilterMarketsByAreaColumnPipe],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {}
