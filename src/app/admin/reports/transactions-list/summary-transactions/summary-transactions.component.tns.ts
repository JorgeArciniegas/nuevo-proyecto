import { Component, OnInit } from '@angular/core';
import { TransactionCategory } from '../transactions-list.model';
import { TransactionsListService } from '../transactions-list.service';
import { UserService } from '../../../../services/user.service';
import { RouterService } from '../../../../services/utility/router/router.service';

@Component({
  selector: 'app-summary-transactions',
  templateUrl: './summary-transactions.component.html',
  styleUrls: ['./summary-transactions.component.scss']
})
export class SummaryTransactionsComponent {
  object = Object;
  transactionType: typeof TransactionCategory = TransactionCategory;

  constructor(public userService: UserService, public transactionsListService: TransactionsListService, private router: RouterService) { }

  goBack(): void {
    this.router.getBack();
  }

  showDetails(item: string) {
    this.router.getRouter().navigate(['admin/reports/transactionsList/detail', item]);
  }
}
