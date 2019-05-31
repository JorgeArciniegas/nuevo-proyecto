import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from '../../app.settings';
import { ElysApiService } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';

@Injectable({
  providedIn: 'root'
})
export class TranslateUtilityService {
  private currentLanguage: string;

  constructor(
    private readonly appSettings: AppSettings,
    private translateService: TranslateService,
    private apiService: ElysApiService,
    private couponService: ElysCouponService
  ) {
    // this.initializeLanguages();
  }

  /**
   * Method to inizialize the list of the application's languages, set the default language and the used one.
   * The "TranslateService.DefaultLanguage" is the default language to use as a fallback
   * in case of a missing key in the dictionary of the language in use.
   */
  public initializeLanguages(browserLang: string): void {
    this.translateService.addLangs(this.appSettings.supportedLang);
    console.log('Languages supported: ', this.appSettings.supportedLang);
    // Set the default language only in the case the company is set in production mode
    if (this.appSettings.production) {
      this.translateService.setDefaultLang(this.appSettings.supportedLang[0]);
      console.log('Default language: ', this.translateService.getDefaultLang());
    }
    console.log('Browser language: ', browserLang);
    // Selection language's logic.
    // Use the language of the browser/device is supported or the default language who is the first element of the supportedLang array.
    this.currentLanguage =
      this.appSettings.supportedLang.findIndex(lang => lang === browserLang) !== -1 ? browserLang : this.appSettings.supportedLang[0];
    this.translateService.use(this.currentLanguage);
    console.log('Current language: ', this.currentLanguage);
  }

  /**
   * Method to change the language in use from the application.
   * @param lang String of the language's code that will be set.
   */
  public changeLanguage(lang: string): void {
    // Check that the language to set it isn't already in use
    if (lang !== this.translateService.currentLang) {
      this.translateService.use(lang);
    }
  }

  public getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

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
