import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-application-menu',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.scss']
})
export class ApplicationMenuComponent implements OnInit {
  public settings: AppSettings;

  constructor(public readonly appSettings: AppSettings) {
    this.settings = appSettings;
  }

  ngOnInit() {}
}
