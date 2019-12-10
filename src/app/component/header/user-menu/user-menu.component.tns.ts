import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AppSettings } from '../../../app.settings';
import { UserService } from '../../../services/user.service';
import { WindowSizeService } from '../../../services/utility/window-size/window-size.service';
import { IconSize } from '../../model/iconSize.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  public settings: AppSettings;
  public myTime: Date = new Date();
  public notifyIcon: IconSize;
  public barHeight: number;
  private myTimeSubscription: Subscription;

  constructor(
    public readonly appSettings: AppSettings,
    public userService: UserService,
    public windowSizeService: WindowSizeService
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
    this.myTimeSubscription = interval(1000).subscribe(() => this.getTime());
    this.barHeight =
      this.windowSizeService.windowSize.height -
      this.windowSizeService.windowSize.columnHeight;
    this.notifyIcon = new IconSize(this.barHeight * 0.5);
  }

  ngOnDestroy(): void {
    this.myTimeSubscription.unsubscribe();
  }

  private getTime(): void {
    this.myTime = new Date();
  }
}
