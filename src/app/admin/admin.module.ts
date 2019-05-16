import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { componentDeclarations, routes } from './admin.common';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [componentDeclarations],
  imports: [
    CommonModule,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
