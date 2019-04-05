import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';

export const componentDeclarations: any[] = [LoginComponent];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];
