import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Receipt } from './print-receipt.model';

@Injectable({
  providedIn: 'root'
})
export class PrintReceiptService {
  printingEnabled: boolean;
  receipt: Receipt;

  constructor(private router: Router) {}

  printWindow(receipt: Receipt): void {
    this.receipt = receipt;
    this.printingEnabled = true;
    this.router.navigate(['/', { outlets: { print: 'print-receipt' } }]);
    document.getElementById('app').classList.add('isPrinting');
    document.getElementsByClassName('cdk-overlay-container')[0].classList.add('isPrinting');
    timer(250)
      .take(1)
      .takeWhile(() => this.printingEnabled)
      .subscribe(valTimer => {
        window.print();
        document.getElementById('app').classList.remove('isPrinting');
        document.getElementsByClassName('cdk-overlay-container')[0].classList.remove('isPrinting');
        this.receipt = undefined;
        this.printingEnabled = false;
        this.router.navigate([{ outlets: { print: null } }]);
      });
  }
}
