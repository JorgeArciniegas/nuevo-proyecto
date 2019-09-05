import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VboxComponent } from './vbox.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VboxComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VboxRoutingModule { }
