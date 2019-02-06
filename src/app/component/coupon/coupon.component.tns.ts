import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  public settings: AppSettings;
  public active: string;
  @Input()
  public timeBlocked: boolean;

  constructor(
    public readonly appSettings: AppSettings,
    public productService: ProductsService
  ) {
    this.settings = appSettings;
    this.active = 'multi';
  }

  ngOnInit() {}

  couponTab(tab: string) {
    this.active = tab;
  }
}
