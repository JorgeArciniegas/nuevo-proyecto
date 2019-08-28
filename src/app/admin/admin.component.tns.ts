import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private router: RouterExtensions, public userService: UserService) {}

  goToBetList(): void {
    this.router.navigateByUrl('/admin/reports/betsList');
  }

  goToLanguageSettings(): void {
    this.router.navigateByUrl('/admin/settings/languages');
  }
}
