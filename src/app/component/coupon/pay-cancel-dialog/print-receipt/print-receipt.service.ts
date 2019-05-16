import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintReceiptService {
  printingEnabled: boolean;

  constructor(private router: Router) {}

  printWindow(): void {
    this.printingEnabled = true;
    this.router.navigate(['/', { outlets: { print: 'print' } }]);
    document.getElementById('app').classList.add('isPrinting');
    timer(250)
      .take(1)
      .takeWhile(() => this.printingEnabled)
      .subscribe(valTimer => {
        window.print();
        document.getElementById('app').classList.remove('isPrinting');
        this.printingEnabled = false;
        this.router.navigate([{ outlets: { print: null } }]);
      });
  }
}
