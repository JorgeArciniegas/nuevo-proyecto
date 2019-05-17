import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Printer } from 'nativescript-printer';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { Receipt } from './print-receipt.model';

@Injectable({
  providedIn: 'root'
})
export class PrintReceiptService {
  receipt: Receipt;
  printer: Printer = new Printer();
  view: StackLayout;

  constructor(private router: Router) {}

  printWindow(receipt: Receipt): void {
    this.receipt = receipt;
    this.router.navigate(['/', { outlets: { print: 'print-receipt' } }]);
  }

  resetPrint(): void {
    this.router.navigate([{ outlets: { print: null } }]);
  }
}
