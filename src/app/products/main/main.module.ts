import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { componentDeclarations, routes } from './main.common';

@NgModule({
  declarations: [componentDeclarations ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class MainModule { }
