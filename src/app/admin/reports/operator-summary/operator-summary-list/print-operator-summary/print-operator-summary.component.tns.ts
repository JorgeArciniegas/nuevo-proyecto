import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Printer } from 'nativescript-printer';
import { OperatorSummary } from './operator-summary.model';
import { PrintOperatorSummaryService } from './print-operator-summary.service';
import { AppSettings } from '../../../../../app.settings';
import { UserService } from '../..//../../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-print-operator-summary',
  templateUrl: './print-operator-summary.component.html',
  styleUrls: ['./print-operator-summary.component.scss']
})
export class PrintOperatorSummaryComponent implements OnInit {
  public operatorSummary: OperatorSummary;
  public printer: Printer = new Printer();
  public rows: string;
  @ViewChild('printing', { static: false }) view: ElementRef;

  constructor(public printService: PrintOperatorSummaryService, public appSettings: AppSettings, public userService: UserService) {
    this.rows = '3*';
    this.printService.operatorSummary.operatorVolumes.map(() => {
      this.rows += ',3*'; // Indicate the rows text value append to GridLayout
    });
  }

  ngOnInit(): void {
    this.operatorSummary = this.printService.operatorSummary;
  }

  print(): void {
    this.printer
      .printScreen({
        view: this.view.nativeElement
      })
      .then(() => this.printService.resetPrint());
  }
}
