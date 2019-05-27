import { Component, OnInit, Inject } from '@angular/core';
import { DestroyCouponService } from './destroy-coupon.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CouponService } from '../coupon.service';

@Component({
  selector: 'app-confirm-destroy-coupon',
  templateUrl: './confirm-destroy-coupon.component.html',
  styleUrls: ['./confirm-destroy-coupon.component.scss']
})
export class ConfirmDestroyCouponComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDestroyCouponComponent>
    ) { }

  ngOnInit() {
  }

  selectedOperation(sel: boolean): void {
    this.dialogRef.close(sel);
  }
}
