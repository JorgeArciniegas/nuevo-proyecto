import { Component } from '@angular/core';
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  settings: Settings;
  public connectionAviable: boolean;

  constructor(public readonly appSettings: AppSettings) {
    this.settings = appSettings;

    this.connectionAviable = getConnectionType() !== connectionType.none;
  }
}
