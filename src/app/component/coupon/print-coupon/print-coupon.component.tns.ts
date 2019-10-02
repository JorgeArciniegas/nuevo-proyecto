import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CouponType, StagedCoupon, CouponStatus } from '@elys/elys-api';
import { Printer } from 'nativescript-printer';
import { AppSettings } from '../../../app.settings';
import { PrintCouponService } from './print-coupon.service';
import { UserService } from '../../../services/user.service';
import { LICENSE_TYPE } from '../../../../environments/environment.models';
import { ImageSource, fromNativeSource } from 'tns-core-modules/image-source/image-source';

const ZXing = require('nativescript-zxing');
@Component({
  selector: 'app-print-coupon',
  templateUrl: './print-coupon.component.html',
  styleUrls: ['./print-coupon.component.scss']
})

export class PrintCouponComponent implements OnInit {
  licenseType: typeof LICENSE_TYPE = LICENSE_TYPE;
  couponPrint: StagedCoupon;
  printer: Printer = new Printer();
  couponStatus: typeof CouponStatus = CouponStatus;
  couponType: typeof CouponType = CouponType;
  qrCodeSource: ImageSource;
  barCode128Source: ImageSource;
  @ViewChild('printingData', { static: false }) view: ElementRef;
  //  @ViewChild('qrcode', { static: true }) qrcode: ElementRef;
  constructor(public printCouponService: PrintCouponService, public appSetting: AppSettings, public userService: UserService) {

  }

  ngOnInit(): void {

    this.generateQrCode();
    this.generateBarCode128();
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
        height: 150,
        width: 150,
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
        width: 350,
        format: ZXing.CODE_128
      }
    );

    this.barCode128Source = fromNativeSource(code128);
  }
}
