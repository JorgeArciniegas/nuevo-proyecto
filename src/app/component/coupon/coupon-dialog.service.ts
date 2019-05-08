import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PayCancelDialogComponent } from './pay-cancel-dialog/pay-cancel-dialog.component';
// import { PayCancelDialogComponent } from './pay-cancel-dialog/pay-cancel-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CouponDialogService {
  private dialogRef = null;

  constructor(private dialog: MatDialog) {}

  /*   openDialog(type: string) {
    this.dialogRef = this.dialog.open(PayCancelDialogComponent, {
      data: type,
      position: { top: '5px' }
    });
  } */

  openPayCancelDialog(type: string): void {
    console.log(type);
    this.dialogRef = this.dialog.open(PayCancelDialogComponent, {
      data: type
      // position: { top: '5px' }
    });
  }
}
