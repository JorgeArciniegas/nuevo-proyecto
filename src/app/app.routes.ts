import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AuthorizationGuard } from './app.authorization.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'dogracing',
        loadChildren: './products/dogracing/dogracing.module#DogracingModule',
        // component: DogracingComponent,
        data: { productName: 'dogracing' }
      },
      {
        path: '',
        redirectTo: 'dogracing',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    loadChildren: './error-page/error-page.module#ErrorPageModule'
  }
];
