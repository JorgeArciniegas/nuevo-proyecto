import { Component, Input, ViewChild } from '@angular/core';
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
import { fromFile, fromData } from 'tns-core-modules/image-source/image-source';
import * as imagepicker from 'nativescript-imagepicker';
import { FormControl } from '@angular/forms';
const ZXing = require('nativescript-zxing');

import { BarcodeScanner } from 'nativescript-barcodescanner';
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

  @ViewChild('couponCode', { static: false }) couponCodeForm: FormControl;
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
            this.userService.increasePlayableBalance(message.StakeGross);
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


  /**
   * SCANNER QRCODE
   */

  loadingQRCODE(): void {
    const context = imagepicker.create({ mode: 'single' });
    context.authorize()
      .then(function () {
        return context.present();
      })
      .then(function (selection) {
        selection.forEach(function (selected) {
          if (global.android) {
            this.processAndroidBarCode(selected);
          } else {
            // IOS
            throw (new Error('Platform isn\'t support'));
          }
        });
      }).catch(function (e) {
        console.log(e, e.stack);
      });

  }

  loadingQrcodeFromView() {
    const barcodescanner = new BarcodeScanner();
    barcodescanner.scan({
      formats: 'QR_CODE, CODE_128',
      /* cancelLabel: 'EXIT. Also, try the volume buttons!', // iOS only, default 'Close'
      cancelLabelBackgroundColor: '#333333', // iOS only, default '#000000' (black) */
      // tslint:disable-next-line:max-line-length
      // message: 'Scan', // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
      /* showFlipCameraButton: true,   // default false
      preferFrontCamera: false,     // default false
      showTorchButton: true,        // default false */
      beepOnScan: true,             // Play or Suppress beep on scan (default true)
      torchOn: false,               // launch with the flashlight on (default false)
      closeCallback: () => { console.log('Scanner closed') }, // invoked when the scanner was closed (success or abort)
      // resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
      // orientation: 'portrait',     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
      openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
      // tslint:disable-next-line:max-line-length
      // presentInRootViewController: true // iOS-only; If you're sure you're not presenting the (non embedded) scanner in a modal, or are experiencing issues with fi. the navigationbar, set this to 'true' and see if it works better for your app (default false).
    }).then((result) => {
      console.log(result);
      // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
      alert({
        title: 'Scan result',
        message: 'Format: ' + result.format + ',\nValue: ' + result.text,
        okButtonText: 'OK'
      });
    }, (errorMessage) => {
      console.log('No scan. ' + errorMessage);
    }
    );

  }

  processAndroidBarCode(uri): void {
    let source;
    console.log('Loading: ', uri.android);
    let is = fromFile(uri.android);
    source = is.android;

    this.finishProcessingBarCode(source);

    is.android.recycle();
    is.android = null;
    is = null;
  }

  finishProcessingBarCode(source) {
    const zxing = new ZXing();

    const results = zxing.decodeBarcode(source, { tryHarder: true, formats: [zxing.QR_CODE, zxing.CODE_128] });
    if (results) {
      this.couponCodeForm.value(results.barcode);
    }
    /*     const resultLabel = page.getElementById('results');
        if (results !== null) {
          resultLabel.text = results.format + ' = ' + results.barcode;
        } else {
          resultLabel.text = 'Not found';
        } */

  }
}
