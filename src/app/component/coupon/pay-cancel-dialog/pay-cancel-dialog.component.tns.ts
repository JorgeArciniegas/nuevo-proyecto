import { Component, Input } from '@angular/core';
import {
  CancelCouponRequest,
  ErrorStatus,
  FlagAsPaidRequest
} from '@elys/elys-api';
import { TextField } from 'tns-core-modules/ui/text-field';
import { DialogTypeCoupon } from '../../../../../src/app/products/products.model';
import { CouponService } from '../coupon.service';
import { CouponDialogService } from '../coupon-dialog.service.tns';
import { UserService } from '../../../services/user.service';

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
  public errorNumberIcon: number;
  public couponIdPatternInvalid = true;

  cancelRequest: CancelCouponRequest;
  payRequest: FlagAsPaidRequest;
  constructor(
    public readonly couponService: CouponService,
    public couponDialogService: CouponDialogService,
    private userService: UserService
  ) {
    this.titleType = DialogTypeCoupon[this.couponDialogService.type];
  }

  public onSubmit(result): void {
    // console.log(DialogTypeCoupon[DialogTypeCoupon.PAY]);
    if (this.titleType === 'PAY') {
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
            message => (
              (this.errorMessage = message.Error
                ? this.errorMessage2[message.Error]
                : 'Server Error'),
              (this.errorNumberIcon = message.Error)
            )
          )
          .catch(
            error =>
              (this.errorMessage =
                'operation not possible (' + error.status + ')')
          );
      }
    } else if (this.titleType === 'CANCEL') {
      if (result) {
        this.cancelRequest = {
          CancellationRequestUserId: this.userService.userDetail.UserId,
          ShopClientId: null,
          CouponId: null,
          TicketCode: result,
          UserWalletTypeId: null,
          Product: 'V'
        };
        this.couponService
          .cancelCoupon(this.cancelRequest)
          .then(
            message =>
              (this.errorMessage = message.ErrorStatus
                ? this.errorMessage2[message.ErrorStatus]
                : 'Server Error'),
            (this.errorNumberIcon = ErrorStatus)
          )
          .catch(
            error =>
              (this.errorMessage =
                'operation not possible (' + error.status + ')')
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
