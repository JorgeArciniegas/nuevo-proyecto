import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CancelCouponRequest, ErrorStatus, FlagAsPaidRequest } from '@elys/elys-api';
import { UserService } from '../../../services/user.service';
import { CouponService } from '../coupon.service';
import { PrintReceiptService } from './print-receipt/print-receipt.service';

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

  cancelRequest: CancelCouponRequest;
  payRequest: FlagAsPaidRequest;

  constructor(
    public dialogRef: MatDialogRef<PayCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    public fb: FormBuilder,
    private couponService: CouponService,
    private userService: UserService,
    private printReceiptService: PrintReceiptService
  ) {
    this.titleType = data;
    this.form = this.fb.group({
      couponCode: [null, Validators.compose([Validators.required, Validators.minLength(2)])]
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
        this.couponService.flagAsPaidCoupon(this.payRequest).then(message => {
          this.errorMessage = message.Error ? this.errorMessage2[message.Error] : 'Server Error';
          this.printReceiptService.printWindow();
        });
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
        this.couponService.cancelCoupon(this.cancelRequest).then(message => {
          this.errorMessage = message.ErrorStatus ? this.errorMessage2[message.ErrorStatus] : 'Server Error';
          this.printReceiptService.printWindow();
        });
        this.form.get('couponCode').setValue('');
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
