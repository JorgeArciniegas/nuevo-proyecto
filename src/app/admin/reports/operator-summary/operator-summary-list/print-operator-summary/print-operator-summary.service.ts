import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { OperatorSummary } from './operator-summary.model';

@Injectable({
  providedIn: 'root'
})
export class PrintOperatorSummaryService {
  printingEnabled: boolean;
  operatorSummary: OperatorSummary;

  constructor(private router: Router) { }
  printWindow(operatorSummary: OperatorSummary): void {
    this.operatorSummary = operatorSummary;
    this.printingEnabled = true;
    this.router.navigate(['/', { outlets: { print: 'print-operator-summary' } }]);
    document.getElementById('app').classList.add('isPrinting');
    timer(250)
      .take(1)
      .takeWhile(() => this.printingEnabled)
      .subscribe(valTimer => {
        window.print();
        document.getElementById('app').classList.remove('isPrinting');
        this.operatorSummary = undefined;
        this.printingEnabled = false;
        this.router.navigate([{ outlets: { print: null } }]);
      });
  }
  resetPrint(): void { }
}
