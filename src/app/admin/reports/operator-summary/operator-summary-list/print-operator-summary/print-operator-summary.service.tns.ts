import { Injectable } from '@angular/core';
import { Printer } from 'nativescript-printer';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { RouterService } from '../../../../../services/utility/router/router.service';
import { OperatorSummary } from './operator-summary.model';

@Injectable({
  providedIn: 'root'
})
export class PrintOperatorSummaryService {
  operatorSummary: OperatorSummary;
  printer: Printer = new Printer();
  view: StackLayout;

  constructor(private router: RouterService) { }

  printWindow(operatorSummary: OperatorSummary): void {
    this.operatorSummary = operatorSummary;
    this.router.getRouter().navigate(['/', { outlets: { print: 'print-operator-summary' } }]);
  }

  resetPrint(): void {
    this.router.getRouter().navigate([{ outlets: { print: null } }]);
  }
}
