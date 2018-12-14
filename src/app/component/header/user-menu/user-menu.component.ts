import { Component, OnInit } from '@angular/core';
import { Observable as ObservableIdle } from 'rxjs/Rx';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public settings: AppSettings;
  public myTime: Date = new Date();

  constructor(public readonly appSettings: AppSettings) {
    this.settings = appSettings;
  }

  ngOnInit() {
    ObservableIdle.interval(1000).subscribe(() => this.getTime());
  }

  getTime(): void {
    this.myTime = new Date();
  }
}
