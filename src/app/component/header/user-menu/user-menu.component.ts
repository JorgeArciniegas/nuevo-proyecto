import { Component, OnInit } from '@angular/core';
import { Observable as ObservableIdle } from 'rxjs/Rx';
import { AppSettings } from 'src/app/app.settings';
import { ProductsService } from 'src/app/products/products.service';
import { IconSize } from '../../model/iconSize.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public settings: AppSettings;
  public myTime: Date = new Date();
  public notifyIcon: IconSize;

  constructor(
    public readonly appSettings: AppSettings,
    public productService: ProductsService
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
    ObservableIdle.interval(1000).subscribe(() => this.getTime());
    const barHeight =
      this.productService.windowSize.height -
      this.productService.windowSize.columnHeight;
    this.notifyIcon = new IconSize(barHeight, barHeight * 0.7);
  }

  getTime(): void {
    this.myTime = new Date();
  }
}
