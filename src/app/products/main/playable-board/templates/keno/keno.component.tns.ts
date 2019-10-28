import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { KenoNumber } from './keno.model';
import { Subscription } from 'rxjs';
import { CouponService } from '../../../../../component/coupon/coupon.service';
import { ElysCouponService, BetCouponExtended } from '@elys/elys-coupon';
import { BtncalcService } from '../../../../../component/btncalc/btncalc.service';
import { MainService } from '../../../main.service';

@Component({
  selector: 'app-playable-board-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent implements OnInit, OnDestroy {
  @Input()
  public rowHeight: number;
  kenoTable: KenoNumber[][] = [];
  numberSelectionQueue: KenoNumber[];
  couponHasChangedSubscription: Subscription;
  couponHasBeenPlacedSubscription: Subscription;
  constructor(
    private mainService: MainService,
    private btnCalcService: BtncalcService,
    private elysCoupon: ElysCouponService,
    private couponService: CouponService
  ) {
    this.numberSelectionQueue = [];
  }

  ngOnInit(): void {
    this.initKenoNumbers();
  }

  ngOnDestroy(): void {
    if (this.couponHasChangedSubscription) {
      this.couponHasChangedSubscription.unsubscribe();
    }

    if (this.couponHasBeenPlacedSubscription) {
      this.couponHasBeenPlacedSubscription.unsubscribe();
    }
  }

  async onNumberClick(kenoNumber: KenoNumber) {
    // kenoNumber.isSelected = !kenoNumber.isSelected;
    if (this.numberSelectionQueue.includes(kenoNumber)) {
      return;
    }
    this.numberSelectionQueue.push(kenoNumber);
    this.mainService.placingNumber(kenoNumber);
    let eventid;
    await this.mainService.getCurrentEvent().then(
      (item) => { eventid = item.mk[0].sls[0].id; }
    );
    this.btnCalcService.lotteryPushToCoupon(kenoNumber.number, eventid);
  }


  private initKenoNumbers(): void {
    let currentNumber = 1;
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 10; ++j) {
        const kenoNumber: KenoNumber = {
          number: currentNumber,
          isSelected: false
        };
        ++currentNumber;
        if (!this.kenoTable[i]) {
          this.kenoTable[i] = [];
        }
        this.kenoTable[i][j] = kenoNumber;
      }
    }
  }


  /**
   * Check the Keno number selected
   * @param coupon
   */
  verifySelectedOdds(coupon: BetCouponExtended): void {
    // extract a temp array that contains
    const tmpRealSel: number[] = coupon.Odds.map(x => Number(x.SelectionName));

    // compare with show table and remove the selected when the selection is delete
    for (let i = 0; i < 8; ++i) {
      this.kenoTable[i].forEach(item => {
        const idx = tmpRealSel.find(index => idx === item.number);
        if (!idx) {
          item.isSelected = false;
        }
      });
    }

    // update the table selection

    tmpRealSel.forEach(odd => {
      for (let i = 0; i < 8; ++i) {
        const kenoSel = this.kenoTable[i].findIndex(obj => obj.number === odd);
        if (kenoSel !== -1) {
          this.kenoTable[i][kenoSel].isSelected = true;
        }
      }
    });

    // update the queue selection
    this.numberSelectionQueue = this.numberSelectionQueue.filter(

      item => {
        for (let i = 0; i < 8; ++i) {
          return tmpRealSel.indexOf(item.number) < 0 &&
            this.kenoTable[i].find(idx => idx.number === item.number && idx.isSelected !== item.isSelected);
        }
      }
    );

  }


}
