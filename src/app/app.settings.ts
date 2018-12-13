import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class AppSettings {
  production: boolean = environment.production;
  staging: boolean = environment.staging;
  pageTitle: string = environment.pageTitle;
  theme: string = environment.theme;
}
