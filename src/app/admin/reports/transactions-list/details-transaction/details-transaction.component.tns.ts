import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserTransaction } from '@elys/elys-api';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { RouterService } from '../../../../services/utility/router/router.service';
import { TransactionsListService } from '../transactions-list.service';

@Component({
  selector: 'app-details-transaction',
  templateUrl: './details-transaction.component.html',
  styleUrls: ['./details-transaction.component.scss']
})
export class DetailsTransactionComponent implements OnInit, OnDestroy {
  routingSub: Subscription;
  transactionDetails: UserTransaction;

  constructor(
    public transactionsListService: TransactionsListService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: RouterService
  ) { }

  ngOnInit(): void {
    this.routingSub = this.route.params.subscribe(param => {
      this.transactionDetails = this.transactionsListService.transactionsList.Transactions.filter(
        transaction => transaction.ReferenceId === param.id
      )[0];
    });
  }

  ngOnDestroy(): void {
    this.routingSub.unsubscribe();
  }

  goBack(): void {
    this.router.getBack();
  }
}
