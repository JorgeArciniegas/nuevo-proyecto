import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  public settings: AppSettings;
  public tapped = false;

  constructor(public readonly appSettings: AppSettings) {
    this.settings = appSettings;
  }

  ngOnInit() {}
}
