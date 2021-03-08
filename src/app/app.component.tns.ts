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
  lowMemoryEvent
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
import { Subscription, timer } from 'rxjs';

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
  private messageId:number = 1;
  private timer : Subscription = new Subscription() ;

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
    this.windowSizeService.initWindowSize();
    this.smallView = (this.windowSizeService.windowSize.height < 800) ? true : false;


    // Application Launched
    // if there is a notification hanging, it will be deleted
    on(launchEvent, (args: LaunchEventData) => {
      console.log('The application was launched!');
      if(this.notification){
        this.notification.deleteMessage(this.messageId);
      }
    });

    // Application suspended
    // the 'last-suspended' data is used for valutate if the session must be delete( case Overview Button Android) in the resume event
    on(suspendEvent, (args: ApplicationEventData) => {
      console.log('Suspended');
      if (this.userService.isUserLogged) {
        this.storageService.setData('last-suspended', new Date().getTime());
        this.timer = timer(24000).subscribe( () => {
          this.openNotification();
          args.android.finishAffinity();
        })
      }
    });

    // Application resumed
    // if 'last-suspended' time is greater to 4 minute force to login again( like for notification )
    on(resumeEvent, (args: ApplicationEventData) => {
      console.log("resumed");
      this.timer.unsubscribe();
      if (this.userService.isUserLogged) {
        if (this.storageService.checkIfExist('last-suspended') && this.storageService.checkDataIsValid('last-suspended')) {
          const now = new Date().getTime();
          const elapsed: number = Math.round((now - this.storageService.getData('last-suspended')) / (60 * 1000));
          if (elapsed >= 4) {
            this.openNotification();
          }
        }
      }
    });
    
    
    //Application Exit
    on(exitEvent, (args: ApplicationEventData) => {
      console.log("destroyed")
      // Destroy session player
      if (this.userService.isUserLogged) {
        this.userService.logout();
      }else{
        this.storageService.removeItems('tokenData', 'UserData');
      }      
      args.android.finishAffinity();
    });

    // Application LowMemory
    on(lowMemoryEvent, (args: ApplicationEventData) => {
      console.log('LowMemory');
    });


    // Discarded Error
    on(discardedErrorEvent,(args: UnhandledErrorEventData) => {
      console.log('discardedErrorListener', args);
    });
  
  }

  // push the notification and logout the user
  openNotification(){
    this.notification.pushMessage({
      title: 'Session terminated',
      body: 'You\'re session has been destroyed. Login again!',
      delay: 0.1,
      id: this.messageId
    });
    this.userService.logout();
  }
  
 
}
