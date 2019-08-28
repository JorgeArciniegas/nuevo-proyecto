import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';

import { OperatorsComponent } from './operators.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from './operators-routing.module';


@NgModule({
  declarations: [OperatorsComponent, EditComponent, CreateComponent, DeleteComponent],
  imports: [
    NativeScriptCommonModule,
    CommonModule,
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ]
})
export class OperatorsModule { }
