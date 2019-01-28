import { Injectable } from '@angular/core';
@Injectable()
export class AppSettings {
  baseApiUrl: string;
  production: boolean;
  staging: boolean;
  pageTitle: string;
  theme: string;
  products: any[];
  showRaceId: boolean;
}
