import { Injectable } from '@angular/core';
import { DialogTypeCoupon } from 'src/app/products/products.model';

@Injectable({
  providedIn: 'root'
})
export class CouponDialogService {
  public showDialog = false;
  public type: DialogTypeCoupon;

  constructor() {}

  openPayCancelDialog(type: DialogTypeCoupon) {
    this.type = type;
    this.showDialog = true;
  }

  openDialog() {
    this.showDialog = true;
  }
}
