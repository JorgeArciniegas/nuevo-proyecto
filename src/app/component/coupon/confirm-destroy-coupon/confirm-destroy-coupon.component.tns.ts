import { Component, OnInit } from '@angular/core';
import { DestroyCouponService } from './destroy-coupon.service';

@Component({
  selector: 'app-confirm-destroy-coupon',
  templateUrl: './confirm-destroy-coupon.component.html',
  styleUrls: ['./confirm-destroy-coupon.component.scss']
})
export class ConfirmDestroyCouponComponent {

  constructor(public destroy: DestroyCouponService) {
  }

}
