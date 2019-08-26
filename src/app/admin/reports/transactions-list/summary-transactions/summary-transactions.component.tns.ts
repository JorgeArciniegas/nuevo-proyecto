import { Component, OnInit } from '@angular/core';
import { TransactionCategory } from '../transactions-list.model';
import { TransactionsListService } from '../transactions-list.service';
import { AppSettings } from '../../../../app.settings';
import { UserService } from '../../../../services/user.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-summary-transactions',
  templateUrl: './summary-transactions.component.html',
  styleUrls: ['./summary-transactions.component.scss']
})
export class SummaryTransactionsComponent {
  object = Object;
  transactionType: typeof TransactionCategory = TransactionCategory;

  constructor(
    public readonly settings: AppSettings,
    public userService: UserService,
    public transactionsListService: TransactionsListService,
    private router: RouterExtensions
  ) {}

  goBack(): void {
    this.router.back();
  }

  showDetails(item: string) {
    this.router.navigate(['admin/reports/transactionsList/detail', item]);
  }
}
