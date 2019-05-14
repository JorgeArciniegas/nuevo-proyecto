import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CouponService } from '../coupon.service';
import { UserService } from '../../../services/user.service';
import { ErrorStatus } from './pay-cancel-dialog.enums';
// import { ErrorStatus } from '@elys/elys-api/lib/shared/shared.enums';

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
  public errorMessage: string;
  public errorMessage2: typeof ErrorStatus = ErrorStatus;

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
          this.payRequest = {
            CouponId: null,
            TicketCode: couponCode,
            IsPaid: true,
            SettlingClientId: null,
            Product: 'V'
          };
        }
        this.couponService
          .flagAsPaidCoupon(this.payRequest)
          .then(
            message =>
              (this.errorMessage = message.Error
                ? this.errorMessage2[message.Error]
                : 'Server Error')
          );
      }
      this.form.get('couponCode').setValue('');
    } else if (this.data === 'CANCEL') {
      if (this.form.valid) {
        couponCode = this.form.get('couponCode').value;
        if (couponCode) {
          this.cancelRequest = {
            CancellationRequestUserId: this.userService.userDetail.UserId,
            ShopClientId: null,
            CouponId: null,
            TicketCode: couponCode,
            UserWalletTypeId: null,
            Product: 'V'
          };
        }
        this.couponService
          .cancelCoupon(this.cancelRequest)
          .then(
            message =>
              (this.errorMessage = message.ErrorStatus
                ? this.errorMessage2[message.ErrorStatus]
                : 'Server Error')
          );
        this.form.get('couponCode').setValue('');
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
