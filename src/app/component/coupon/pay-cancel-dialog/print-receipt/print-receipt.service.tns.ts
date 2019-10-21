import { Injectable } from '@angular/core';
import { Printer } from 'nativescript-printer';
import { RouterService } from '../../../../services/utility/router/router.service';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { Receipt } from './print-receipt.model';

@Injectable({
  providedIn: 'root'
})
export class PrintReceiptService {
  receipt: Receipt;
  printer: Printer = new Printer();
  view: StackLayout;

  constructor(private router: RouterService) { }

  printWindow(receipt: Receipt): void {
    this.receipt = receipt;
    this.router.getRouter().navigate(['/', { outlets: { print: 'print-receipt' } }]);
  }

  resetPrint(): void {
    this.router.getRouter().navigate([{ outlets: { print: null } }]);
  }
}
