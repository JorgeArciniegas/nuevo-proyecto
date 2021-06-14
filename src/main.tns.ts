// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from '@nativescript/angular';
import { AppModule } from './app/app.module';

// import the main plugin classes
import { AppSync, InstallMode, SyncStatus } from "nativescript-app-sync";
import { environment } from './environments/environment';

import  * as application from '@nativescript/core/application';
if(environment.deploymentAppSync){
  application.on(application.resumeEvent, ()=>{
    AppSync.sync({
      deploymentKey: environment.deploymentAppSync.android ,
      installMode: InstallMode.ON_NEXT_RESTART, // this is the default install mode; the app updates upon the next cold boot (unless the --mandatory flag was specified while pushing the update) 
      mandatoryInstallMode: InstallMode.IMMEDIATE, // the default is InstallMode.ON_NEXT_RESUME which doesn't bother the user as long as the app is in the foreground. InstallMode.IMMEDIATE shows an installation prompt. Don't use that for iOS AppStore distributions because Apple doesn't want you to, but if you have an Enterprise-distributed app, go right ahead!
      // serverUrl: 'http://192.168.1.67:8080',
      updateDialog: { // only used for InstallMode.IMMEDIATE
        updateTitle: "Please restart the app", // an optional title shown in the update dialog 
        optionalUpdateMessage: "Optional update msg",   // a message shown for non-"--mandatory" releases 
        mandatoryUpdateMessage: "Mandatory update msg", // a message shown for "--mandatory" releases
        optionalIgnoreButtonLabel: "Later", // if a user wants to continue their session, the update will be installed on next resume
        mandatoryContinueButtonLabel: application.ios ? "Exit now" : "Restart now", // On Android we can kill and restart the app, but on iOS that's not possible so the user has to manually restart it. That's why we provide a different label in this example.
        appendReleaseDescription: true // appends the description you (optionally) provided when releasing a new version to AppSync
      }
    }, (syncStatus: SyncStatus, updateLabel?: string): void => {
      switch (syncStatus) {
        case SyncStatus.UP_TO_DATE:
          //alert(`AppSync: no pending updates; you're running the latest version, which is ${updateLabel}`);
        break;
        case SyncStatus.UPDATE_INSTALLED:
          alert(`AppSync: update installed (${updateLabel}) - it will be activated upon next cold boot`);
        break;
        case SyncStatus.ERROR:
          alert(`AppSync: update error (${updateLabel})`);
        break;
        
        default:
        break;
      }
    });
  });
}


// A traditional NativeScript application starts by initializing global objects, setting up global CSS rules, creating, and navigating to the main page. 
// Angular applications need to take care of their own initialization: modules, components, directives, routes, DI providers. 
// A NativeScript Angular app needs to make both paradigms work together, so we provide a wrapper platform object, platformNativeScriptDynamic, 
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);
