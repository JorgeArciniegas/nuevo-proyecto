import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes, componentDeclarations } from './main.common';
import { RaceComponent } from './results/templates/race/race.component';

@NgModule({
  declarations: [componentDeclarations, RaceComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class MainModule { }
