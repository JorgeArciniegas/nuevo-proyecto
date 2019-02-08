import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes /* , {
  preloadingStrategy: PreloadAllModules // <- comment this line for activate lazy load
  // useHash: true
} */
);
