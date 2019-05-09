import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PayCancelDialogComponent } from './pay-cancel-dialog/pay-cancel-dialog.component';
import { DialogData } from 'src/app/products/products.model';
// import { PayCancelDialogComponent } from './pay-cancel-dialog/pay-cancel-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CouponDialogService {
  public dialogRef: MatDialogRef<PayCancelDialogComponent> = null;
  constructor(private dialog: MatDialog) {

  }

  openPayCancelDialog(type: string): void {
    console.log(type);
    this.dialogRef = this.dialog.open(PayCancelDialogComponent, {
      data: type
      // position: { top: '5px' }
    });
  }
}
