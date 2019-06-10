import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { UserService } from '../services/user.service';
import { AppSettings } from '../app.settings';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  public settings: AppSettings;
  constructor(private router: RouterExtensions, public userService: UserService, public readonly appSettings: AppSettings) {
    this.settings = appSettings;
  }

  goToBetList(): void {
    this.router.navigateByUrl('/admin/reports/betsList');
  }

  goToLanguageSettings(): void {
    this.router.navigateByUrl('/admin/settings/languages');
  }
}
