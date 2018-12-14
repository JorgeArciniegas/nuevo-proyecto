import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogracingComponent } from './products/dogracing/dogracing.component';
import { ProductsComponent } from './products/products.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'dogracing',
        component: DogracingComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes /* , {
  preloadingStrategy: PreloadAllModules // <- comment this line for activate lazy load
  // useHash: true
} */
);
