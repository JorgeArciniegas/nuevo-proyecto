import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateUtilityService {
  constructor(public translateService: TranslateService) {}

  public async getTranslatedStringAsync(value: string): Promise<string> {
    return this.translateService.get(value).toPromise();
  }

  public getTranslatedString(value: string): string {
    let result: string;

    this.translateService.get(value).subscribe((res: string) => {
      result = res;
    });

    return result;
  }

  public getTranslatedStringWithParams(value: string, params: object): string {
    let result: string;

    this.translateService.get(value, params).subscribe((res: string) => {
      result = res;
    });

    return result;
  }

  public async getTranslatedStringWithParamsAsync(value: string, params: object): Promise<string> {
    return this.translateService.get(value, params).toPromise();
  }
}
