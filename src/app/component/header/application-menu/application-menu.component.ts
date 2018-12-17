import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { ProductsService } from 'src/app/products/products.service';
import { IconSize } from '../iconSize.model';

@Component({
  selector: 'app-application-menu',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.scss']
})
export class ApplicationMenuComponent implements OnInit {
  public settings: AppSettings;
  public logoIcon: IconSize;
  public menuIcon: IconSize;
  public buttonIcon: IconSize;

  constructor(
    public readonly appSettings: AppSettings,
    public productService: ProductsService
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
    const barHeight =
      this.productService.windowSize.height -
      this.productService.windowSize.columnHeight;
    this.logoIcon = new IconSize(barHeight * 0.9, barHeight * 0.9);
    this.menuIcon = new IconSize(barHeight * 0.9, barHeight * 0.9);
    this.buttonIcon = new IconSize(barHeight * 0.7, barHeight * 0.7);
  }
}
