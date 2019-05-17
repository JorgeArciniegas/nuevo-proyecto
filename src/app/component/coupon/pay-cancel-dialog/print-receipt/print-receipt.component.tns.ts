import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Printer } from 'nativescript-printer';
import { Receipt } from './print-receipt.model';
import { PrintReceiptService } from './print-receipt.service.tns';

@Component({
  selector: 'app-print-coupon',
  templateUrl: './print-coupon.component.tns.html',
  styleUrls: ['./print-coupon.component.tns.scss']
})
export class PrintCouponComponent implements OnInit {
  public receipt: Receipt;
  public date: Date;
  public printer: Printer = new Printer();
  @ViewChild('printing') view: ElementRef;

  constructor(public printService: PrintReceiptService) {}

  ngOnInit(): void {
    this.receipt = this.printService.receipt;
    this.date = new Date();
  }

  print(): void {
    this.printer
      .printScreen({
        view: this.view.nativeElement
      })
      .then(() => this.printService.resetPrint());
  }
}
