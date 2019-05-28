import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CouponService } from '../coupon.service';
import { ConfirmDestroyCouponComponent } from './confirm-destroy-coupon.component';

@Injectable({
  providedIn: 'root'
})
export class DestroyCouponService {

  public dialogRef: MatDialogRef<ConfirmDestroyCouponComponent> = null;
  public showDialog = false;

  constructor(private dialog: MatDialog,
    private couponservice: CouponService
    ) { }


  openDestroyCouponDialog(racing?: string, product?: string ): void {
    this.close();
    this.dialogRef = this.dialog.open(ConfirmDestroyCouponComponent, {
      data: {racing: racing, product: product, confirm: false },
      id: 'destroy-coupon-dialog'
    });
    this.dialogRef.afterClosed().subscribe( elem => {
      if (elem ) {
        this.couponservice.resetCoupon();
      }
    });
  }


  close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
