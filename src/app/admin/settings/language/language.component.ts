import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { Language } from './language.model';
import { TranslateUtilityService } from 'src/app/services/utility/translate-utility.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {
  languages: string[];
  languageEnum: typeof Language = Language;

  constructor(private appSettings: AppSettings, private translateService: TranslateUtilityService) {
    this.languages = appSettings.supportedLang;
  }

  changeLanguage(lang: string) {
    this.translateService.changeLanguage(lang);
  }
}
