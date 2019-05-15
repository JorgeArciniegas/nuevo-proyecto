import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PayCancelDialogComponent } from './pay-cancel-dialog/pay-cancel-dialog.component';
import { DialogTypeCoupon } from '../../../../src/app/products/products.model';
// import { DialogData } from 'src/app/products/products.model';
// import { PayCancelDialogComponent } from './pay-cancel-dialog/pay-cancel-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CouponDialogService {
  public dialogRef: MatDialogRef<PayCancelDialogComponent> = null;
  public showDialog = false;

  constructor(private dialog: MatDialog) {}

  openPayCancelDialog(type: DialogTypeCoupon): void {
    this.close();
    this.dialogRef = this.dialog.open(PayCancelDialogComponent, {
      data: type
      // , { hasBackdrop: true }
    });
  }

  close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
