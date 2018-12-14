import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToolbarButtons } from 'src/environments/environment.models';
@Injectable()
export class AppSettings {
  production: boolean = environment.production;
  staging: boolean = environment.staging;
  pageTitle: string = environment.pageTitle;
  theme: string = environment.theme;
  toolbarButtons: ToolbarButtons[] = environment.toolbarButtons;
}
