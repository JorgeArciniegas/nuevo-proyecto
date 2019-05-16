import { Component, OnInit } from '@angular/core';
import { CouponStatusInternal, CouponTypeInternal } from './bets-list.model';
import { BetsListService } from './bets-list.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit {

  // productList: typeof VirtualSportId = VirtualSportId;
  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;

  constructor(public betsListService: BetsListService) {
  }

  ngOnInit() { }

  changeValue(key: string, value: any) {
    this.betsListService[key] = value;
  }

}
