import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes, componentDeclarations } from './login.common';

@NgModule({
  declarations: [componentDeclarations],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class LoginModule {}
