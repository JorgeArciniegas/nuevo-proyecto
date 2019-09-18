import { Component, Input } from '@angular/core';
import {
  CancelCouponRequest,
  ErrorStatus,
  FlagAsPaidRequest
} from '@elys/elys-api';
import { TextField } from 'tns-core-modules/ui/text-field';
import { DialogTypeCoupon } from '../../../../../src/app/products/products.model';
import { UserService } from '../../../services/user.service';
import { CouponDialogService } from '../coupon-dialog.service.tns';
import { CouponService } from '../coupon.service';
import { Receipt } from './print-receipt/print-receipt.model';
import { PrintReceiptService } from './print-receipt/print-receipt.service.tns';

@Component({
  selector: 'app-pay-cancel-dialog',
  templateUrl: './pay-cancel-dialog.component.tns.html',
  styleUrls: ['./pay-cancel-dialog.component.scss']
})
export class PayCancelDialogComponent {
  @Input()
  private type: DialogTypeCoupon;
  public titleType: string;
  public errorMessage: string;
  public errorMessage2: typeof ErrorStatus = ErrorStatus;
  public errorNumberIcon: number;
  public couponIdPatternInvalid = false;
  cancelRequest: CancelCouponRequest;
  payRequest: FlagAsPaidRequest;

  constructor(
    public readonly couponService: CouponService,
    public couponDialogService: CouponDialogService,
    private userService: UserService,
    private printService: PrintReceiptService
  ) {
    this.titleType = DialogTypeCoupon[this.couponDialogService.type];
  }

  public onSubmit(couponCode: string): void {
    // console.log(DialogTypeCoupon[DialogTypeCoupon.PAY]);
    if (this.couponDialogService.type === DialogTypeCoupon.PAY) {
      if (couponCode) {
        this.payRequest = {
          CouponId: null,
          TicketCode: couponCode,
          IsPaid: true,
          SettlingClientId: !this.userService.isLoggedOperator() ? this.userService.dataUserDetail.operatorDetail.ClientId : null,
          Product: 'V'
        };
        this.couponService
          .flagAsPaidCoupon(this.payRequest)
          .then(message => {
            this.errorMessage = this.errorMessage2[message.Error];
            this.errorNumberIcon = message.Error;
            // In case of successful operation start the print of the receipt
            if (message.Error === ErrorStatus.Success) {
              this.printService.printWindow(
                new Receipt(couponCode, true, message.Stake)
              );
              this.close();
              this.userService.isModalOpen = false;
              this.userService.isBtnCalcEditable = true;
            }
          })
          .catch(
            error =>
              (this.errorMessage =
                'operation not possible (' + error.status + ')')
          );
      }
    } else if (this.couponDialogService.type === DialogTypeCoupon.DELETE) {
      if (couponCode) {
        this.cancelRequest = {
          CancellationRequestUserId: this.userService.isLoggedOperator() ?
            this.userService.dataUserDetail.userDetail.UserId :
            this.userService.dataUserDetail.operatorDetail.UserId,
          ShopClientId: !this.userService.isLoggedOperator() ?
            this.userService.dataUserDetail.operatorDetail.ClientId :
            null,
          CouponId: null,
          TicketCode: couponCode,
          UserWalletTypeId: null,
          Product: 'V'
        };
        this.couponService
          .cancelCoupon(this.cancelRequest)
          .then(message => {
            this.errorMessage = this.errorMessage2[message.ErrorStatus];
            this.errorNumberIcon = message.ErrorStatus;
            // In case of successful operation start the print of the receipt
            if (message.ErrorStatus === ErrorStatus.Success) {
              this.printService.printWindow(
                new Receipt(couponCode, false, message.StakeGross)
              );
              this.close();
              this.userService.isModalOpen = false;
              this.userService.isBtnCalcEditable = true;
            }
          })
          .catch(
            error =>
              (this.errorMessage =
                'operation not possible (' + error.status + ')')
          );
      }
    }
  }

  public validatePattern(args, name: string): void {
    const textField = <TextField>args.object;
    const re = /^[a-zA-Z0-9]+\-[a-zA-Z0-9]+\-[a-zA-Z0-9]+$/;
    if (name === 'couponCode') {
      this.couponIdPatternInvalid = re.test(textField.text);
    }
  }

  close(): void {
    this.couponDialogService.closeDialog();
    this.userService.isModalOpen = false;
    this.userService.isBtnCalcEditable = true;
  }
}
