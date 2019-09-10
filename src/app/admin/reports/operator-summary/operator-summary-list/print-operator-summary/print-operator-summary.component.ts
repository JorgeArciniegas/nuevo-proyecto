import { Component, OnInit } from '@angular/core';
import { OperatorSummary } from './operator-summary.model';
import { PrintOperatorSummaryService } from './print-operator-summary.service';
import { AppSettings } from '../../../../../app.settings';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-print-operator-summary',
  templateUrl: './print-operator-summary.component.html',
  styleUrls: ['./print-operator-summary.component.scss']
})
export class PrintOperatorSummaryComponent implements OnInit {
  public operatorSummary: OperatorSummary;

  constructor(private printService: PrintOperatorSummaryService, public appSettings: AppSettings, public userService: UserService) { }

  ngOnInit() {
    this.operatorSummary = this.printService.operatorSummary;
  }

}
