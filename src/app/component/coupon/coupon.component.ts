import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  @Input()
  rowHeight: number;

  constructor() {
  }

  ngOnInit() {}
}
