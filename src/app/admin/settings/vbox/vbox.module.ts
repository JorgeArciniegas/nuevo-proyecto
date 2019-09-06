import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VboxRoutingModule } from './vbox-routing.module';
import { VboxComponent } from './vbox.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VboxEditComponent } from './vbox-edit/vbox-edit.component';

@NgModule({
  declarations: [VboxComponent, VboxEditComponent],
  imports: [
    CommonModule,
    VboxRoutingModule,
    SharedModule
  ]
})
export class VboxModule { }
