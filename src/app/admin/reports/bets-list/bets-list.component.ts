import { Component, OnInit } from '@angular/core';
import { BetsListService } from './bets-list.service';
import { CouponStatus } from '@elys/elys-api';
import { ProductEnum } from './bets-list.model';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit {

  productList: typeof ProductEnum = ProductEnum;

  constructor(public betsListService: BetsListService) {
    this.betsListService.couponStatus = CouponStatus.Lost;
    console.log(this.betsListService.sportId);
  }

  ngOnInit() { }

  changeValue(key: string, value:  any) {
    this.betsListService[key] = value;
  }
  changeDateTypeCoupon(typeDataSelected: boolean): void {
    this.betsListService.typeDataSelected = typeDataSelected;
    console.log(this.betsListService.request);
  }
}
