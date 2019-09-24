import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Printer } from 'nativescript-printer';
import { Receipt } from './print-receipt.model';
import { PrintReceiptService } from './print-receipt.service.tns';
import { AppSettings } from '../../../../app.settings';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.tns.html',
  styleUrls: ['./print-receipt.component.tns.scss']
})
export class PrintReceiptComponent implements OnInit {
  public receipt: Receipt;
  public date: Date;
  public printer: Printer = new Printer();
  @ViewChild('printing', { static: false }) view: ElementRef;

  constructor(
    public printService: PrintReceiptService,
    public appSettings: AppSettings,
    public userService: UserService) { }

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
