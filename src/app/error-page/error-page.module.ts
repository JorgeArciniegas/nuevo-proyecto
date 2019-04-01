import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './error-page.common';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ErrorPageModule {}
