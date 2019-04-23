import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../app.settings';
import { CouponService } from '../component/coupon/coupon.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public rowHeight: number;
  public settings: AppSettings;


  constructor(
    public service: ProductsService,
    public readonly appSettings: AppSettings,
    public readonly couponService: CouponService
  ) {
    this.settings = appSettings;

    this.service.fnWindowsSize();
    this.rowHeight = (this.service.windowSize.columnHeight - 30) / 11;
  }

}
