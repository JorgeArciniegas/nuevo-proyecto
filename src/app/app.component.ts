import { Component, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { UserService } from './services/user.service';
import { TranslateUtilityService } from './services/utility/translate-utility.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  settings: Settings;
  public faviconPath: string;

  constructor(
    private appSettings: AppSettings,
    private translateService: TranslateService,
    private translateUtilityService: TranslateUtilityService,
    public userService: UserService
  ) {
    this.settings = this.appSettings;
    this.faviconPath = this.appSettings.faviconPath;
    // Set the application language passing the browser one.
    this.translateUtilityService.initializeLanguages(this.translateService.getBrowserLang());
  }

  ngOnInit(): void {
    // Insert favicon's link of the specific skin
    const linkElement: HTMLLinkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'icon');
    linkElement.setAttribute('type', 'image/x-icon');
    linkElement.setAttribute('href', this.faviconPath);
    if (document.head) {
      document.head.appendChild(linkElement);
    }
  }
}
