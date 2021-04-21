import { Injectable } from '@angular/core';
import { RouterService } from '../../../../services/utility/router/router.service';
import { Receipt } from './print-receipt.model';

@Injectable({
  providedIn: 'root'
})
export class PrintReceiptService {
  receipt: Receipt;

  constructor(private router: RouterService) { }

  printWindow(receipt: Receipt): void {
    this.receipt = receipt;
    this.router.getRouter().navigate(['/', { outlets: { print: 'print-receipt' } }]);
  }

  resetPrint(): void {
    this.router.getRouter().navigate([{ outlets: { print: null } }]);
  }
}
