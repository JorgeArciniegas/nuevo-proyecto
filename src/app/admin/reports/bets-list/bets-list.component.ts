import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { AccountVirtualSport, AccountOperator } from '@elys/elys-api';
import { Observable } from 'rxjs';
import { TranslateUtilityService } from '../../../../../src/app/services/utility/translate-utility.service';
import { CouponStatusInternal, CouponTypeInternal } from './bets-list.model';
import { BetsListService } from './bets-list.service';
import { OperatorsService } from '../../settings/operators/operators.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit, OnDestroy {
  @ViewChild('pickerDateFrom', { static: false }) private inputPickerDateFrom;
  @ViewChild('pickerDateTo', { static: false }) private inputPickerDateTo;

  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;

  constructor(
    public betsListService: BetsListService,
    private translate: TranslateUtilityService,
    private adapter: DateAdapter<Date>,
    public operatorService: OperatorsService
  ) {

    this.adapter.setLocale(this.translate.getCurrentLanguage());
    document.body.classList.add('bets-list');

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
  ngOnInit() {
    this.operatorService.rowNumber = 10;
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
      default:
        this.betsListService[key] = value;
        break;
    }

  }

  selectOperator(operator?: AccountOperator): void {
    if (operator) {
      this.betsListService.operatorSelected = operator;
      this.betsListService['idAgentClient'] = operator.IDClient;
    } else {
      this.betsListService.operatorSelected = null;
      this.betsListService['idAgentClient'] = 0;
    }
  }


  checkClassListToDismiss(): boolean {
    return true;
  }


  trackBySportId(idx: number, request: AccountVirtualSport): number {
    return request.SportId;
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
