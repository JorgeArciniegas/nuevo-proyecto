import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes, componentDeclarations } from './login.common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [componentDeclarations],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class LoginModule {}
