import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CouponStatus, CouponType, StagedCoupon } from '@elys/elys-api';
import { Printer } from 'nativescript-printer';
import { Subscription, timer } from 'rxjs';
import { fromNativeSource, ImageSource } from 'tns-core-modules/image-source/image-source';
import { LICENSE_TYPE } from '../../../../environments/environment.models';
import { AppSettings } from '../../../app.settings';
import { UserService } from '../../../services/user.service';
import { TranslateUtilityService } from '../../../services/utility/translate-utility.service';
import { PrintCouponService } from './print-coupon.service';

const ZXing = require('@elys/nativescript-zxing');
@Component({
  selector: 'app-print-coupon',
  templateUrl: './print-coupon.component.html',
  styleUrls: ['./print-coupon.component.scss']
})

export class PrintCouponComponent implements OnInit, OnDestroy {
  licenseType: typeof LICENSE_TYPE = LICENSE_TYPE;
  couponPrint: StagedCoupon;
  printer: Printer = new Printer();
  couponStatus: typeof CouponStatus = CouponStatus;
  couponType: typeof CouponType = CouponType;
  qrCodeSource: ImageSource;
  barCode128Source: ImageSource;
  @ViewChild('printingData', { static: false }) view: ElementRef;

  maxCombinationBetWin: number;

  subscriptions: Subscription = new Subscription();
  get hideMaxPaymentAmount(): boolean {
    return this.appSettings.printSettings.enabledPrintCoupon.hideMaxPaymentAmount;
  }

  constructor(
    public printCouponService: PrintCouponService,
    public appSettings: AppSettings,
    public userService: UserService,
    private translateUtilityService: TranslateUtilityService
  ) {
    this.maxCombinationBetWin = userService.limitUser.MaxCombinationBetWin;
  }

  ngOnInit(): void {

    this.generateQrCode();
    this.generateBarCode128();

    this.subscriptions.add(timer(100).subscribe(()=>this.print()));

  }
  ngOnDestroy(): void { 
    this.subscriptions.unsubscribe();
  }

  print(): void {
    this.printer
      .printScreen({
        view: this.view.nativeElement
      })
      .then(() => this.printCouponService.resetPrint());
  }


  generateQrCode(): void {
    const zx = new ZXing();
    // QR CODE GENERATOR
    const qrCode = zx.createBarcode(
      {
        encode: this.printCouponService.couponPrint.CouponCode,
        height: 300,
        width: 300,
        format: ZXing.QR_CODE
      }
    );
    this.qrCodeSource = fromNativeSource(qrCode);
  }
  // BARCODE 128EN GENERATOR

  generateBarCode128(): void {
    const zx = new ZXing();

    const code128 = zx.createBarcode(
      {
        encode: this.printCouponService.couponPrint.CouponCode,
        height: 200,
        width: 600,
        format: ZXing.CODE_128
      }
    );

    this.barCode128Source = fromNativeSource(code128);
  }

  getSelectionName(marketName: string, selectionName: string): string {
    if (marketName.toUpperCase().substring(0, marketName.length - 1) === 'RAINBOW' ||
      marketName.toUpperCase() === 'TOTALCOLOUR') {
      switch (selectionName.substring(0, 1).toLowerCase()) {
        case 'b': return this.translateUtilityService.getTranslatedString('BLUE') + ' ' + selectionName.substring(1);
        case 'r': return this.translateUtilityService.getTranslatedString('RED') + ' ' + selectionName.substring(1);
        case 'g': return this.translateUtilityService.getTranslatedString('GREEN') + ' ' + selectionName.substring(1);
        case 'n': return this.translateUtilityService.getTranslatedString('NO_WINNING_COLOUR') + ' ' + selectionName.substring(1);
        default:
          break;
      }
    }
    return this.translateUtilityService.getTranslatedString(selectionName.toUpperCase());
  }
}
