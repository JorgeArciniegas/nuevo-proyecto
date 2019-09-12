import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CancelCouponRequest, ErrorStatus, FlagAsPaidRequest } from '@elys/elys-api';
import { UserService } from '../../../services/user.service';
import { CouponService } from '../coupon.service';
import { PrintReceiptService } from './print-receipt/print-receipt.service';
import { Receipt } from './print-receipt/print-receipt.model';
import { DialogTypeCoupon } from '../../../products/products.model';

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
  public errorNumberIcon: number;

  cancelRequest: CancelCouponRequest;
  payRequest: FlagAsPaidRequest;
  dialogTypeCoupon: typeof DialogTypeCoupon = DialogTypeCoupon;
  constructor(
    public dialogRef: MatDialogRef<PayCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogTypeCoupon,
    public fb: FormBuilder,
    private couponService: CouponService,
    private userService: UserService,
    private printReceiptService: PrintReceiptService
  ) {
    this.titleType = this.dialogTypeCoupon[data];
    this.form = this.fb.group({
      couponCode: [null, Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  ngOnInit() { }

  public onSubmit(form: FormGroup): void {
    let couponCode: string;
    if (this.data === this.dialogTypeCoupon.PAY) {
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
          .then(message => {
            this.errorMessage = this.errorMessage2[message.Error];
            this.errorNumberIcon = message.Error;
            // In case of successful operation start the print of the receipt
            if (message.Error === ErrorStatus.Success) {
              this.printReceiptService.printWindow(new Receipt(couponCode, true, message.Stake));
              this.close();
            }
          })
          .catch(error => (this.errorMessage = 'operation not possible (' + error.status + ')'));
        this.form.get('couponCode').setValue('');
      }
      this.form.get('couponCode').setValue('');
    } else if (this.data === this.dialogTypeCoupon.DELETE) {
      if (this.form.valid) {
        couponCode = this.form.get('couponCode').value;
        if (couponCode) {
          this.cancelRequest = {
            CancellationRequestUserId: this.userService.dataUserDetail.userDetail.UserId,
            ShopClientId: null,
            CouponId: null,
            TicketCode: couponCode,
            UserWalletTypeId: null,
            Product: 'V'
          };
        }
        this.couponService
          .cancelCoupon(this.cancelRequest)
          .then(message => {
            this.errorMessage = this.errorMessage2[message.ErrorStatus];
            this.errorNumberIcon = message.ErrorStatus;
            // In case of successful operation start the print of the receipt
            if (message.ErrorStatus === ErrorStatus.Success) {
              this.printReceiptService.printWindow(new Receipt(couponCode, false, message.StakeGross));
              this.close();
            }
          })
          .catch(error => (this.errorMessage = 'operation not possible (' + error.status + ')'));
        this.form.get('couponCode').setValue('');
      }
    }
  }

  close(): void {
    this.dialogRef.close();
    this.userService.isModalOpen = false;
    this.userService.isBtnCalcEditable = true;
  }
}
