import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VboxRoutingModule } from './vbox-routing.module';
import { VboxComponent } from './vbox.component';

@NgModule({
  declarations: [VboxComponent],
  imports: [
    CommonModule,
    VboxRoutingModule
  ]
})
export class VboxModule { }
