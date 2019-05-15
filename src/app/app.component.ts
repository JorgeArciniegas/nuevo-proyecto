import { Component } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  settings: Settings;

  constructor(
    public readonly appSettings: AppSettings,
    public userService: UserService
  ) {
    this.settings = appSettings;
  }
}
