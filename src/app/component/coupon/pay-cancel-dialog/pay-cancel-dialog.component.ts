import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CouponService } from '../coupon.service';
import { UserService } from '../../../services/user.service';

interface CancelRequest {
  CancellationRequestUserId: number;
  ShopClientId: number;
  CouponId: number;
  TicketCode: string;
  UserWalletTypeId: number;
  Product: string;
}

interface PayRequest {
  CouponId: number;
  TicketCode: string;
  IsPaid: boolean;
  SettlingClientId: number;
  Product: string;
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

  cancelRequest: CancelRequest;
  payRequest: PayRequest;

  constructor(
    public dialogRef: MatDialogRef<PayCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    public fb: FormBuilder,
    private couponService: CouponService,
    private userService: UserService
  ) {
    this.titleType = data;
    this.form = this.fb.group({
      couponCode: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ]
    });
  }

  ngOnInit() {}

  public onSubmit(form: FormGroup): void {
    let couponCode: string;
    if (this.data === 'PAY') {
      if (this.form.valid) {
        couponCode = this.form.get('couponCode').value;
        if (couponCode) {
          const splittedcouponCode: string[] = couponCode.split('-', 3);
          this.payRequest = {
            CouponId: Number(splittedcouponCode[0]),
            TicketCode: couponCode,
            IsPaid: true,
            SettlingClientId: Number(splittedcouponCode[2]),
            Product: null
          };
        }
        this.couponService
          .flagAsPaidCoupon(this.payRequest)
          .then(message => (this.errorMessage = message));
        console.log(this.errorMessage);
      }
      this.form.get('couponCode').setValue('');
    } else if (this.data === 'CANCEL') {
      if (this.form.valid) {
        couponCode = this.form.get('couponCode').value;
        if (couponCode) {
          const splittedcouponCode: string[] = couponCode.split('-', 3);
          this.cancelRequest = {
            CancellationRequestUserId: this.userService.userDetail.UserId,
            ShopClientId: Number(splittedcouponCode[1]),
            CouponId: Number(splittedcouponCode[2]),
            TicketCode: couponCode,
            UserWalletTypeId: null,
            Product: splittedcouponCode[2]
          };
        }
        console.log(this.cancelRequest);
        this.couponService
          .cancelCoupon(this.cancelRequest)
          .then(message => (this.errorMessage = message));
        this.form.get('couponCode').setValue('');
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
