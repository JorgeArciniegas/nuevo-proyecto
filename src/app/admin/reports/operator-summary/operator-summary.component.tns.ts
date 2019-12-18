import { Component, OnInit } from '@angular/core';
import { ModalDatetimepicker } from 'nativescript-modal-datetimepicker';
import { UserService } from '../../../services/user.service';
import { OperatorSummaryService } from './operator-summary.service';
import { LoaderService } from '../../../services/utility/loader/loader.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-operator-summary',
  templateUrl: './operator-summary.component.html',
  styleUrls: ['./operator-summary.component.scss']
})
export class OperatorSummaryComponent implements OnInit {

  constructor(
    public operatorSummaryService: OperatorSummaryService,
    public userService: UserService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    timer(300).subscribe(() =>
      this.loaderService.setLoading(false, 'ChildrenAdmin')
    );
  }
  selectDate(key: string): void {
    const picker = new ModalDatetimepicker();

    picker.pickDate().then(result => {
      this.operatorSummaryService[key] = new Date(result.year, result.month - 1, result.day);
    });
  }
}
