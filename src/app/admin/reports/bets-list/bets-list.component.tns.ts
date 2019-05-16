
import { Component, OnInit } from '@angular/core';
import { BetsListService } from './bets-list.service';
import { VirtualSportId, CouponTypeInternal, CouponStatusInternal } from './bets-list.model';
import { AppSettings } from '../../../app.settings';
import { ModalDatetimepicker } from 'nativescript-modal-datetimepicker';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit {

  productList: typeof VirtualSportId = VirtualSportId;
  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;
  constructor(
    public betsListService: BetsListService,
    public readonly settings: AppSettings
  ) {

  }

  ngOnInit(): void { }

  changeValue(key: string, value: any): void {
    this.betsListService[key] = value;
  }

  selectDate(key: string): void {
    const picker = new ModalDatetimepicker();

    picker.pickDate().then(result => {
      switch (key) {
        case 'dateFrom':
          this.betsListService.dateFrom = new Date(result.year, result.month - 1, result.day);
          break;
        case 'dateTo':
          this.betsListService.dateTo = new Date(result.year, result.month - 1, result.day);
          break;
        default:
          break;
      }
    });
  }

}
