import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './login.routes';

export const loginRouting: ModuleWithProviders = RouterModule.forChild(
  loginRoutes /* , {
  preloadingStrategy: PreloadAllModules // <- comment this line for activate lazy load
  // useHash: true
} */
);
