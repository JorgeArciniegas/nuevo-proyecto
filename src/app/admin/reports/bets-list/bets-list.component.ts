import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccountVirtualSport } from '@elys/elys-api';
import { Observable } from 'rxjs';
import { CouponStatusInternal, CouponTypeInternal } from './bets-list.model';
import { BetsListService } from './bets-list.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit, OnDestroy {


  @ViewChild('pickerDateFrom') private inputPickerDateFrom;
  @ViewChild('pickerDateTo') private inputPickerDateTo;

  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;

  constructor(public betsListService: BetsListService ) {

    document.body.classList.add('bets-list');

    // close the date picker on outside click
    Observable.fromEvent(document, 'click').subscribe((event: any) => {
      const elem: any = event.target;
      let dismiss = true;
      event.path.forEach( htmlElem => {
        if (!htmlElem.classList) {
          return;
        }
        htmlElem.classList.forEach(item => {
          if (/mat-dialog.*/.test(item) || /mat-calendar*/.test(item) || /datepicker*/.test(item)) {
            dismiss = false;
          }
        });
      });

      if ( this.inputPickerDateFrom.opened && dismiss ) {
       this.inputPickerDateFrom.close();
      }

      if ( this.inputPickerDateTo.opened &&  dismiss ) {
        this.inputPickerDateTo.close();
       }
    });
  }



  ngOnDestroy(): void {
    document.body.classList.remove('bets-list');
  }
  ngOnInit() { }

  changeValue(key: string, value: any) {
    this.betsListService[key] = value;
  }

  checkClassListToDismiss(): boolean {
    return true;
  }


  trackBySportId(idx: number, request: AccountVirtualSport ): number {
    return request.SportId;
  }
}
