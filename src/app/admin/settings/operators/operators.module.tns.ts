import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '../../../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { routes } from './operators-routing.module';
import { OperatorsComponent } from './operators.component';



@NgModule({
  declarations: [OperatorsComponent, EditComponent, CreateComponent, DeleteComponent],
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class OperatorsModule { }
