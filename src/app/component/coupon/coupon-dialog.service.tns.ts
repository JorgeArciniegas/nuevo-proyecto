import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouponDialogService {
  public showDialog = false;
  public type: string;

  constructor() {}

  openPayCancelDialog(type: string) {
    this.showDialog = true;
  }
}
