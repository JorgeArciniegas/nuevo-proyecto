import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { componentDeclarations, routes } from './main.common';
import { CockfightComponent } from './results/templates/cockfight/cockfight.component';
@NgModule({
  declarations: [componentDeclarations],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {}
