import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BetsListComponent } from './reports/bets-list/bets-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'reports/betsList',
    component: BetsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
