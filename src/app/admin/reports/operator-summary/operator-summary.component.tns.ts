import { Component } from '@angular/core';
import { ModalDatetimepicker } from 'nativescript-modal-datetimepicker';
import { UserService } from '../../../services/user.service';
import { OperatorSummaryService } from './operator-summary.service';

@Component({
  selector: 'app-operator-summary',
  templateUrl: './operator-summary.component.html',
  styleUrls: ['./operator-summary.component.scss']
})
export class OperatorSummaryComponent {

  constructor(
    public operatorSummaryService: OperatorSummaryService,
    public userService: UserService
  ) { }

  selectDate(key: string): void {
    const picker = new ModalDatetimepicker();

    picker.pickDate().then(result => {
      this.operatorSummaryService[key] = new Date(result.year, result.month - 1, result.day);
    });
  }
}
