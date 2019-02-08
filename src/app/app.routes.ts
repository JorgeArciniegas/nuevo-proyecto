import { Routes } from '@angular/router';
import { DogracingComponent } from './products/dogracing/dogracing.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products/dogracing',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'dogracing',
        component: DogracingComponent,
        data: { productName: 'dogracing' }
      }
    ]
  }
];
