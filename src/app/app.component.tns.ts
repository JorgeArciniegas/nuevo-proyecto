import { Component } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  settings: Settings;

  constructor(page: Page, public readonly appSettings: AppSettings) {
    this.settings = appSettings;
  }
}
