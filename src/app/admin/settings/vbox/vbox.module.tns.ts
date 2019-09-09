import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { VboxEditComponent } from './vbox-edit/vbox-edit.component';
import { routes } from './vbox-routing.module';
import { VboxComponent } from './vbox.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';


@NgModule({
  declarations: [VboxComponent, VboxEditComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    SharedModule
  ]
})
export class VboxModule { }
