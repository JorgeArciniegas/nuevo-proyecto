import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TransactionsListService } from './transactions-list.service';
import { Observable } from 'rxjs';
import { TranslateUtilityService } from '../../../services/utility/translate-utility.service';
import { DateAdapter } from '@angular/material';
import { TransactionType } from './transactions-list.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnDestroy {
  @ViewChild('pickerDateFrom') private inputPickerDateFrom;
  @ViewChild('pickerDateTo') private inputPickerDateTo;

  object = Object;
  transactionType: typeof TransactionType = TransactionType;

  constructor(
    public transactionsListService: TransactionsListService,
    public userService: UserService,
    private translate: TranslateUtilityService,
    private adapter: DateAdapter<Date>
  ) {
    this.adapter.setLocale(this.translate.getCurrentLanguage());
    document.body.classList.add('transactions-list');

    // close the date picker on outside click
    Observable.fromEvent(document, 'click').subscribe((event: any) => {
      const elem: any = event.target;
      let dismiss = true;
      event.path.forEach(htmlElem => {
        if (!htmlElem.classList) {
          return;
        }
        htmlElem.classList.forEach(item => {
          if (/mat-dialog.*/.test(item) || /mat-calendar*/.test(item) || /datepicker*/.test(item)) {
            dismiss = false;
          }
        });
      });

      if (this.inputPickerDateFrom.opened && dismiss) {
        this.inputPickerDateFrom.close();
      }

      if (this.inputPickerDateTo.opened && dismiss) {
        this.inputPickerDateTo.close();
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bets-list');
  }

  changeValue(key: string, value: TransactionType): void {
    this.transactionsListService[key] = value;
  }
}
