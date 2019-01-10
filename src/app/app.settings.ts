import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Products } from 'src/environments/environment.models';
@Injectable()
export class AppSettings {
  baseApiUrl: string = environment.baseApiUrl;
  production: boolean = environment.production;
  staging: boolean = environment.staging;
  pageTitle: string = environment.pageTitle;
  theme: string = environment.theme;
  products: Products[] = environment.products;
  showRaceId: boolean = environment.showRaceId;
}
