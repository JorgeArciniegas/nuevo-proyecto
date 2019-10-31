import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TransactionsListService } from './transactions-list.service';
import { TransactionCategory } from './transactions-list.model';
import { ModalDatetimepicker } from 'nativescript-modal-datetimepicker';
import { AppSettings } from '../../../app.settings';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent {
  object = Object;
  transactionCategory: typeof TransactionCategory = TransactionCategory;

  constructor(
    public transactionsListService: TransactionsListService,
    public readonly settings: AppSettings,
    public userService: UserService
  ) {}

  changeValue(key: string, value: TransactionCategory): void {
    this.transactionsListService[key] = value;
  }

  selectDate(key: string): void {
    const picker = new ModalDatetimepicker();

    picker.pickDate().then(result => {
      this.transactionsListService[key] = new Date(result.year, result.month - 1, result.day);
    });
  }
}