import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Printer } from 'nativescript-printer';
import { Receipt } from './print-receipt.model';
import { PrintReceiptService } from './print-receipt.service';
import { AppSettings } from '../../../../app.settings';
import { UserService } from '../../../../services/user.service';
import { LICENSE_TYPE } from '../../../../../environments/environment.models';
import { Subscription, timer } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.tns.html',
  styleUrls: ['./print-receipt.component.tns.scss']
})
export class PrintReceiptComponent implements OnInit, OnDestroy {
  public receipt: Receipt;
  public date: Date;
  public printer: Printer = new Printer();
  licenseType: typeof LICENSE_TYPE = LICENSE_TYPE;
  @ViewChild('printingData', { static: false }) view: ElementRef;

  subscriptions: Subscription = new Subscription();

  constructor(
    public printService: PrintReceiptService,
    public appSettings: AppSettings,
    public userService: UserService) { }

  ngOnInit(): void {
    this.receipt = this.printService.receipt;
    this.date = new Date();
    this.subscriptions.add(timer(100).subscribe(() => this.print()));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  print(): void {
    this.printer
      .printScreen({
        view: this.view.nativeElement
      })
      .then(() => this.printService.resetPrint());
  }
}
