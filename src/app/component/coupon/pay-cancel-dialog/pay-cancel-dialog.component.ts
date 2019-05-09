import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CouponService } from '../coupon.service';

interface PayCancelForm {
  couponId: string;
}

@Component({
  selector: 'app-pay-cancel-dialog',
  templateUrl: './pay-cancel-dialog.component.html',
  styleUrls: ['./pay-cancel-dialog.component.scss']
})
export class PayCancelDialogComponent implements OnInit {
  public titleType: string;
  public form: FormGroup;
  public errorMessage: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<PayCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    public fb: FormBuilder,
    public readonly couponService: CouponService
  ) {
    this.titleType = data;
    this.form = this.fb.group({
      couponId: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ]
    });
  }

  ngOnInit() {}

  public onSubmit(form: PayCancelForm): void {
    console.log(this.data);
    if (this.data === 'PAY') {
      console.log(this.data);
      if (this.form.valid) {
        // this.couponService.cancelCoupon(form.couponId).then(message => (this.errorMessage = message));
        this.couponService.flagAsPaidCoupon(form.couponId);
        this.form.get('couponId').setValue('');
      }
      // this.dialogRef.close();
    } else if (this.data === 'CANCEL') {
      console.log(this.data);
      if (this.form.valid) {
        // this.couponService.cancelCoupon(form.couponId).then(message => (this.errorMessage = message));
        this.couponService.cancelCoupon(form.couponId);
        this.form.get('couponId').setValue('');
      }
      // this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
    // this.couponService.oddStakeEditSubject.next(null);
    // this.data.opened = false;
  }
}
