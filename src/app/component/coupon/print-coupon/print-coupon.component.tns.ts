import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CouponType, StagedCoupon } from '@elys/elys-api';
import { Printer } from 'nativescript-printer';
import { PrintCouponService } from './print-coupon.service';

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
  constructor(public printCouponService: PrintCouponService) {}

  ngOnInit() { }

  ngAfterViewInit() {
    // console.log('startPrint', this.view.);
    /* dialogs.confirm({
      title: 'PRINT?',
      message: 'Do you wnat to print receipt?',
      okButtonText: 'PRINT',
      cancelButtonText: 'NO',
    }).then( res => {
      if (res) {
        this.printer.printScreen({
          view: this.view.nativeElement
        });
      }
    }); */
  }

  print(args) {
    console.log('print');
    this.printer.printScreen({
      view: this.view.nativeElement
    }).then( () => this.printCouponService.resetPrint() );
  }
}
