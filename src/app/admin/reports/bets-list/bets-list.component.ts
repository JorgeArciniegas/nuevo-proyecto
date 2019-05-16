import { Component, OnInit } from '@angular/core';
import { BetsListService } from './bets-list.service';
import { VirtualSportId, CouponTypeInternal, CouponStatusInternal } from './bets-list.model';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit {

  productList: typeof VirtualSportId = VirtualSportId;
  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;
  constructor(public betsListService: BetsListService) {
    this.betsListService.couponStatus = CouponStatusInternal.Placed;
    console.log(this.betsListService.sportId);
  }

  ngOnInit() { }

  changeValue(key: string, value: any) {
    this.betsListService[key] = value;
  }

}
