import { Component } from '@angular/core';
import { CouponService } from '../coupon.service';
import { TextField } from 'tns-core-modules/ui/text-field';

@Component({
  selector: 'app-pay-cancel-dialog',
  templateUrl: './pay-cancel-dialog.component.html',
  styleUrls: ['./pay-cancel-dialog.component.scss']
})
export class PayCancelDialogComponent {
  public errorMessage: string | undefined;
  public couponIdPatternInvalid = true;

  constructor(public readonly couponService: CouponService) {}

  public onSubmit(result): void {
    alert('Text: ' + result);
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
