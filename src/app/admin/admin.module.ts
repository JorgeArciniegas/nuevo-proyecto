import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { componentDeclarations, routes } from './admin.common';

@NgModule({
  declarations: [componentDeclarations],
  imports: [CommonModule, SharedModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, RouterModule.forChild(routes)],
  exports: [MatDatepickerModule, MatInputModule, MatNativeDateModule]
})
export class AdminModule { }
