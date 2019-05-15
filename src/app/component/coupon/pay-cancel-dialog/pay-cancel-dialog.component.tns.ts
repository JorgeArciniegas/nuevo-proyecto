import { Component, Input } from '@angular/core';
import { CouponService } from '../coupon.service';
import { TextField } from 'tns-core-modules/ui/text-field';
import { CancelCouponRequest, FlagAsPaidRequest, ErrorStatus } from '@elys/elys-api';
import { DialogTypeCoupon } from 'src/app/products/products.model';

@Component({
  selector: 'app-pay-cancel-dialog',
  templateUrl: './pay-cancel-dialog.component.html',
  styleUrls: ['./pay-cancel-dialog.component.scss']
})
export class PayCancelDialogComponent {
  @Input()
  private type: DialogTypeCoupon;
  public titleType: string;
  public errorMessage: string;
  public errorMessage2: typeof ErrorStatus = ErrorStatus;
  public couponIdPatternInvalid = true;

  cancelRequest: CancelCouponRequest;
  payRequest: FlagAsPaidRequest;

  constructor(public readonly couponService: CouponService) {
    this.titleType = DialogTypeCoupon[this.type];
  }

  public onSubmit(result): void {
    if (this.titleType === DialogTypeCoupon[DialogTypeCoupon.PAY] ) {
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
    alert('Close ');
  }
}
