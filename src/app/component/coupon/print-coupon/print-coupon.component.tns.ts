import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CouponType, StagedCoupon } from '@elys/elys-api';
import { Printer } from 'nativescript-printer';
import { PrintCouponService } from './print-coupon.service';
import { AppSettings } from '../../../app.settings';

@Component({
  selector: 'app-print-coupon',
  templateUrl: './print-coupon.component.tns.html',
  styleUrls: ['./print-coupon.component.tns.scss']
})
export class PrintCouponComponent implements OnInit, AfterViewInit {
  couponPrint: StagedCoupon;
  printer: Printer = new Printer();
  couponType: typeof CouponType = CouponType;
  @ViewChild('printing') view: ElementRef;
  constructor(public printCouponService: PrintCouponService, public appSetting: AppSettings) {}

  ngOnInit() { }

  ngAfterViewInit() {

  }

  print(args) {
    console.log('print');
    this.printer.printScreen({
      view: this.view.nativeElement
    }).then( () => this.printCouponService.resetPrint() );
  }
}
