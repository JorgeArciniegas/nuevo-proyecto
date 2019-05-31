import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppSettings } from '../app.settings';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public settings: AppSettings;
  constructor(
    public readonly appSettings: AppSettings,
    public userService: UserService
  ) {this.settings = appSettings; }

  ngOnInit() {
  }

}
