import { Component, Input, OnInit } from '@angular/core';
import { CouponStatus } from '@elys/elys-api';
import { AppSettings } from '../../../../../../../src/app/app.settings';
import { OddsEventRows } from '../detail-coupon.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {


  @Input() data: OddsEventRows;
  couponStatus: typeof CouponStatus = CouponStatus;

  constructor(public settings: AppSettings) { }

  ngOnInit() {
  }

}
