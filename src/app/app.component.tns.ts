import { Component } from '@angular/core';
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { UserService } from './services/user.service';
import { device } from 'tns-core-modules/platform';
import { TranslateUtilityService } from './services/utility/translate-utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  settings: Settings;
  public connectionAviable: boolean;

  constructor(
    public readonly appSettings: AppSettings,
    public userService: UserService,
    private translateService: TranslateUtilityService
  ) {
    this.settings = appSettings;

    this.translateService.initializeLanguages(device.language);
    this.connectionAviable = getConnectionType() !== connectionType.none;
  }
}
