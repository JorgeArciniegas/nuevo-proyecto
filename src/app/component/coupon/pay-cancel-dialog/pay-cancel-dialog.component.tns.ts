import { Component, Input } from '@angular/core';
import { CancelCouponRequest, ErrorStatus, FlagAsPaidRequest } from '@elys/elys-api';
import { TextField } from 'tns-core-modules/ui/text-field';
import { DialogTypeCoupon } from '../../../../../src/app/products/products.model';
import { CouponService } from '../coupon.service';
import { CouponDialogService } from '../coupon-dialog.service.tns';

@Component({
  selector: 'app-pay-cancel-dialog',
  templateUrl: './pay-cancel-dialog.component.tns.html',
  styleUrls: ['./pay-cancel-dialog.component.scss']
})
export class PayCancelDialogComponent {

  @Input()
  private type: string;

  public titleType: string;
  public errorMessage: string;
  public errorMessage2: typeof ErrorStatus = ErrorStatus;
  public couponIdPatternInvalid = true;

  cancelRequest: CancelCouponRequest;
  payRequest: FlagAsPaidRequest;
  constructor(public readonly couponService: CouponService, public couponDialogService: CouponDialogService) {
    this.titleType = DialogTypeCoupon[this.couponDialogService.type];
  }

  public onSubmit(result): void {
    if (this.type === DialogTypeCoupon[DialogTypeCoupon.PAY] ) {
      console.log(this.titleType);
      if (result) {
        this.payRequest = {
          CouponId: null,
          TicketCode: result,
          IsPaid: true,
          SettlingClientId: null,
          Product: 'V'
        };
        this.couponService
          .flagAsPaidCoupon(this.payRequest)
          .then(
            message =>
              (this.errorMessage = message.Error
                ? this.errorMessage2[message.Error]
                : 'Server Error')
          );
      }
    }
  }

  public validatePattern(args, couponId: string): void {
    this.errorMessage = undefined;
    const textField = <TextField>args.object;
    if (couponId === 'couponId') {
      // this.couponIdPatternInvalid = textField.text;
    }
  }

  close(): void {
    // alert('Close ');
    this.couponDialogService.closeDialog();

  }
}
