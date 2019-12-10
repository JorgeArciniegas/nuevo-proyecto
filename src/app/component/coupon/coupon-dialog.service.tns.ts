import { Injectable } from '@angular/core';
import { DialogTypeCoupon } from '../../../../src/app/products/products.model';
import { UserService } from '../../../../src/app/services/user.service';

@Injectable(/* {
  providedIn: 'root'
} */)
export class CouponDialogService {
  public showDialog = false;
  public type: DialogTypeCoupon;

  constructor(private userService: UserService) { }

  openPayCancelDialog(type: DialogTypeCoupon) {
    this.userService.isModalOpen = true;
    this.userService.isBtnCalcEditable = false;
    this.type = type;
    this.showDialog = true;
  }

  openDialog() {
    this.userService.isModalOpen = true;
    this.userService.isBtnCalcEditable = false;
    this.showDialog = true;
  }

  closeDialog() {
    this.type = null;
    this.showDialog = false;
    this.userService.isModalOpen = false;
    this.userService.isBtnCalcEditable = true;
  }
}
