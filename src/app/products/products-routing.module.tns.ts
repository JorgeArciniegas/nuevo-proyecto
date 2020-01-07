import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      }
    ],
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class ProductsRoutingModule { }
