
import { Component, OnInit } from '@angular/core';
import { BetsListService } from './bets-list.service';
import { CouponTypeInternal, CouponStatusInternal } from './bets-list.model';
import { AppSettings } from '../../../app.settings';
import { ModalDatetimepicker } from 'nativescript-modal-datetimepicker';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent  {

  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;
  constructor(
    public betsListService: BetsListService,
    public readonly settings: AppSettings
  ) {

  }

  changeValue(key: string, value: any): void {
    this.betsListService[key] = value;
  }

  selectDate(key: string): void {
    const picker = new ModalDatetimepicker();

    picker.pickDate().then(result => {
      this.betsListService[key] = new Date(result.year, result.month - 1, result.day);
    });
  }

  public couponCode(args: any): void {
    const textField: TextField = <TextField>args.object;
    this.betsListService.ticketCode = textField.text;
  }

}
