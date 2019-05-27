import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { interval } from 'rxjs';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../../products/products.service';
import { IconSize } from '../../model/iconSize.model';
import { UserService } from '../../../../../src/app/services/user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, AfterViewInit {
  public settings: AppSettings;
  public myTime: Date = new Date();
  public notifyIcon: IconSize;

  constructor(
    public readonly appSettings: AppSettings,
    public productService: ProductsService,
    public userService: UserService
  ) {
    this.settings = appSettings;
  }
  ngAfterViewInit(): void {
    const barHeight =
      this.productService.windowSize.height -
      this.productService.windowSize.columnHeight;
    this.notifyIcon = new IconSize(barHeight, barHeight * 0.7);
  }
  ngOnInit() {
    interval(1000).subscribe(() => this.getTime());
  }

  getTime(): void {
    this.myTime = new Date();
  }
}
