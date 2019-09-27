import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
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
  ]
})
export class OperatorsModule { }
