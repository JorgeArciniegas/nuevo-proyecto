import { Component } from '@angular/core';
import { AppSettings } from '../app.settings';
import { StorageService } from '../services/utility/storage/storage.service';
import { RouterService } from '../services/utility/router/router.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {

  private _homeExternalLink: string;
  public get homeExternalLink(): string {
    const urlLink = this.storageService.getData('callBackURL');
    return urlLink ? urlLink : '/';
  }

  constructor(private storageService: StorageService, public appSetting: AppSettings, private routerService: RouterService) { }

  gotoHome() {
    if (this.appSetting.loginInteractive) {
      this.routerService.getRouter().navigateByUrl('/');
    } else {
      this.routerService.callBackToBrand();
    }
  }
}
