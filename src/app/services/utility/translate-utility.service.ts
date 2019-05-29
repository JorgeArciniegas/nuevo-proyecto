import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class TranslateUtilityService {
  constructor(private readonly appSettings: AppSettings, private translateService: TranslateService) {
    // this.initializeLanguages();
  }

  /**
   * Method to inizialize the list of the application's languages and set the default language and the used one.
   * The "TranslateService.DefaultLanguage" is the default language to use as a fallback
   * in case of a missing key in the dictionary of the language in use.
   */
  public initializeLanguages(browserLang: string): void {
    this.translateService.addLangs(this.appSettings.supportedLang);
    console.log('Languages supported: ', this.appSettings.supportedLang);
    this.translateService.setDefaultLang(this.appSettings.supportedLang[0]);
    console.log('Defualt language: ', this.translateService.getDefaultLang());

    // Selection language's logic
    console.log('Browser language: ', browserLang);
    this.translateService.use(
      this.appSettings.supportedLang.findIndex(lang => lang === browserLang) !== -1 ? browserLang : this.appSettings.supportedLang[0]
    );
    console.log('Current language: ', this.translateService.currentLang);
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
