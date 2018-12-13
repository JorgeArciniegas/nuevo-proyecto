import { ModuleWithProviders } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules // <- comment this line for activate lazy load
  // useHash: true
});
