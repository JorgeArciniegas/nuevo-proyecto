import { Component } from '@angular/core';
import {
  ApplicationEventData,
  UnhandledErrorEventData,
  exitEvent,
  launchEvent,
  LaunchEventData,
  on,
  resumeEvent,
  suspendEvent,
  discardedErrorEvent,
} from 'tns-core-modules/application';
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity';
import { device } from 'tns-core-modules/platform';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { UserService } from './services/user.service';
import { StorageService } from './services/utility/storage/storage.service';
import { TranslateUtilityService } from './services/utility/translate-utility.service';
import { WindowSizeService } from './services/utility/window-size/window-size.service';
import { NotificationService } from './notifications/notification.service';



let launchListener,
  suspendListener,
  resumeListener,
  discardedErrorListener,
  exitListener;

@Component({
  moduleId: module.id,
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
    private storageService: StorageService,
    private notification: NotificationService
  ) {
    this.settings = appSettings;
    // Set the application language passing the device one.
    this.translateService.initializeLanguages(device.language);
    this.connectionAviable = getConnectionType() !== connectionType.none;
    this.smallView = (this.windowSizeService.getWindowSize().height < 800) ? true : false;

    launchListener = (args: LaunchEventData) => {
      console.log('The appication was launched!');
    };

    on(launchEvent, launchListener);
    // >> Application suspended
    suspendListener = (args: ApplicationEventData) => {
      // Added the time of suspended the app
      this.storageService.setData('last-suspended', new Date().getTime());
    };

    on(suspendEvent, suspendListener);
    // Application suspended <<

    discardedErrorListener = (args: UnhandledErrorEventData) => {
      console.log('discardedErrorListener', args);
    };

    on(discardedErrorEvent, discardedErrorListener);

    // >> Application resume
    resumeListener = (args: ApplicationEventData) => {
      // Compare the time elapsed after the suspend
      try {
        if (this.storageService.checkIfExist('last-suspended') && this.storageService.checkDataIsValid('last-suspended')) {
          const now = new Date().getTime();
          const elapsed = Math.round((now - this.storageService.getData('last-suspended')) / (60 * 1000));
          // console.log(now, this.storageService.getData('last-suspended'), elapsed);
          // if the time elapsed is major of 1 minute, the user is automatically logout
          if (elapsed > 1 && elapsed < 5) {
            if (this.userService.isUserLogged) {
              this.userService.logout();
            }
            notification.pushMessage({
              title: 'Session terminated',
              body: 'You\'re session has been destroyed. Login again!',
              delay: 2,
              id: 1
            });

          } else if (elapsed >= 5) {
            if (this.userService.isUserLogged) {
              this.userService.logout();
            }
            notification.pushMessage({
              title: 'Application closed.',
              body: 'Vdesk app is closed! Thank you for ',
              delay: 1,
              id: 1
            });
            args.android.finishAffinity();
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    on(resumeEvent, resumeListener);
    // Application resume <<
    // >> Application Exit
    exitListener = (args: ApplicationEventData) => {
      // Destroy session player
      this.storageService.removeItems('tokenData', 'UserData');
      args.android.finishAffinity();
    };
    on(exitEvent, exitListener);
    // Application Exit <<
  }
}
