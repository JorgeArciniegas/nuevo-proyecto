import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouponDialogService {
  public showDialog = false;
  public type: string;

  constructor() {}

  openPayCancelDialog(type: string) {
    this.type = type;
    this.showDialog = true;
  }

  openDialog() {
    this.showDialog = true;
  }
}
