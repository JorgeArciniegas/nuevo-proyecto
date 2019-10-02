
import { Component, OnInit } from '@angular/core';
import { BetsListService } from './bets-list.service';
import { CouponTypeInternal, CouponStatusInternal } from './bets-list.model';
import { AppSettings } from '../../../app.settings';
import { ModalDatetimepicker } from 'nativescript-modal-datetimepicker';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { AccountOperator } from '@elys/elys-api';
import { OperatorsService } from '../../settings/operators/operators.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit {

  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;
  columnOperatorGrid: string;
  constructor(
    public betsListService: BetsListService,
    public readonly settings: AppSettings,
    public operatorService: OperatorsService
  ) {
  }

  ngOnInit(): void {
    this.operatorService.rowNumber = 9;
    this.columnOperatorGrid = '*,*,*,*,*,*,*,*,*,*';
    this.operatorService.getListOfOperators();
  }

  changeValue(key: string, value: any) {
    switch (key) {
      case 'couponStatus':
        if (value === CouponStatusInternal.Cancelled) {
          this.betsListService['dateHasPlaced'] = false;
          this.betsListService['carriedOut'] = false;
          this.betsListService[key] = value;
        } else {
          this.betsListService['carriedOut'] = false;
          this.betsListService[key] = value;
        }
        break;
      case 'dateHasPlaced':
        this.betsListService['dateHasPlaced'] = value;
        this.betsListService['carriedOut'] = false;
        break;
      case 'carriedOut':
        this.betsListService[key] = value;
        if (value === true) {
          this.betsListService['couponStatus'] = CouponStatusInternal.ALL;
        }
        break;
      default:
        this.betsListService[key] = value;
        break;
    }

  }

  /**
   *
   * @param operator
   */
  selectOperator(operator?: AccountOperator): void {
    if (operator) {
      this.betsListService.operatorSelected = operator;
      this.betsListService['idAgentClient'] = operator.IDClient;
    } else {
      this.betsListService.operatorSelected = null;
      this.betsListService['idAgentClient'] = 0;
    }
  }

  selectDate(key: string): void {
    const picker = new ModalDatetimepicker();

    picker.pickDate().then(result => {
      this.betsListService[key] = new Date(result.year, result.month - 1, result.day);
    });
  }

  public couponCode(args: any): void {
    const textField: TextField = <TextField>args.object;
    this.betsListService.ticketCode = textField.text;
  }



  previusPage() {
    if (this.operatorService.listOfOperators.actualPages <= 0) {
      return;
    }
    this.operatorService.listOfOperators.actualPages--;
    this.operatorService.filterOperators();
  }


  nextPage() {
    if (this.operatorService.listOfOperators.actualPages >= this.operatorService.listOfOperators.totalPages - 1) {
      return;
    }
    this.operatorService.listOfOperators.actualPages++;
    this.operatorService.filterOperators();
  }
}
