import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '../../../shared/shared.module';
import { VboxEditComponent } from './vbox-edit/vbox-edit.component';
import { routes } from './vbox-routing.module';
import { VboxComponent } from './vbox.component';
import { VboxService } from './vbox.service';


@NgModule({
  declarations: [VboxComponent, VboxEditComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    SharedModule
  ],
  providers: [VboxService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VboxModule { }
