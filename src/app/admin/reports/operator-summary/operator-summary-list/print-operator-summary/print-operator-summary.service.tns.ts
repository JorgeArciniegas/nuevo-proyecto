import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OperatorSummary } from './operator-summary.model';
import { Printer } from 'nativescript-printer';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';

@Injectable({
  providedIn: 'root'
})
export class PrintOperatorSummaryService {
  operatorSummary: OperatorSummary;
  printer: Printer = new Printer();
  view: StackLayout;

  constructor(private router: Router) { }

  printWindow(operatorSummary: OperatorSummary): void {
    this.operatorSummary = operatorSummary;
    this.router.navigate(['/', { outlets: { print: 'print-operator-summary' } }]);
  }

  resetPrint(): void {
    this.router.navigate([{ outlets: { print: null } }]);
  }
}
