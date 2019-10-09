import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { UserService } from './services/user.service';
import { device } from 'tns-core-modules/platform';
import { TranslateUtilityService } from './services/utility/translate-utility.service';
import { WindowSizeService } from './services/utility/window-size/window-size.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  settings: Settings;
  public connectionAviable: boolean;
  smallView = false;
  constructor(
    public readonly appSettings: AppSettings,
    public userService: UserService,
    private translateService: TranslateUtilityService,
    private windowSizeService: WindowSizeService,

  ) {
    this.settings = appSettings;
    // Set the application language passing the device one.
    this.translateService.initializeLanguages(device.language);
    this.connectionAviable = getConnectionType() !== connectionType.none;
    this.smallView = (this.windowSizeService.getWindowSize().height < 800) ? true : false;

  }

}
