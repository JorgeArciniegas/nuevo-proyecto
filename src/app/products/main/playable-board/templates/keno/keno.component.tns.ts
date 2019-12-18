import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BetCouponExtended, ElysCouponService } from '@elys/elys-coupon';
import { Subscription, timer } from 'rxjs';
import { BtncalcService } from '../../../../../component/btncalc/btncalc.service';
import { CouponService } from '../../../../../component/coupon/coupon.service';
import { LoaderService } from '../../../../../services/utility/loader/loader.service';
import { MainService } from '../../../main.service';
import { KenoNumberNative } from './keno.model';

@Component({
  moduleId: module.id,
  selector: 'app-playable-board-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent implements OnInit, OnDestroy {
  @Input()
  public rowHeight: number;
  kenoTable: KenoNumberNative[] = [];
  numberSelectionQueue: KenoNumberNative[];
  couponHasChangedSubscription: Subscription;
  couponHasBeenPlacedSubscription: Subscription;
  constructor(
    private mainService: MainService,
    private btnCalcService: BtncalcService,
    private elysCoupon: ElysCouponService,
    private couponService: CouponService,
    private loaderService: LoaderService
  ) {
    this.numberSelectionQueue = [];
  }

  ngOnInit(): void {
    this.initKenoNumbers();
    this.couponHasChangedSubscription = this.elysCoupon.couponHasChanged.subscribe(coupon => {
      if (coupon) {
        this.verifySelectedOdds(coupon);
      } else {
        this.numberSelectionQueue = [];

        // The coupon was removed.
        this.kenoTable.map(item => {
          if (item.isSelected) {
            item.isSelected = false;
          }
        });
      }

      // it's required for disable the spinner is loading when the product selected is same to product menu touched.
      timer(300).subscribe(() => this.loaderService.setLoading(false, null));
    });

    // Reload selection when the coupon has been deleted or has been placed
    this.couponHasBeenPlacedSubscription = this.couponService.couponHasBeenPlacedObs.subscribe(b => {
      this.kenoTable.map(item => {
        if (item.isSelected) {
          item.isSelected = false;
        }
      });
      if (!this.kenoTable.find(item => item.isSelected === true)) {
        this.numberSelectionQueue = [];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.couponHasChangedSubscription) {
      this.couponHasChangedSubscription.unsubscribe();
    }

    if (this.couponHasBeenPlacedSubscription) {
      this.couponHasBeenPlacedSubscription.unsubscribe();
    }
  }

  async onNumberClick(kenoNumber: KenoNumberNative) {
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
    const kenoNumbers: KenoNumberNative[] = [];
    let row = 0;
    let col = 0;
    for (let i = 1; i <= 80; ++i) {
      if (i % 10 === 1) {
        ++row;
      }
      if (i % 10 === 1) {
        col = 0;
      }
      const kenoNumber: KenoNumberNative = {
        number: i,
        isSelected: false,
        row,
        col
      };
      kenoNumbers.push(kenoNumber);
      ++col;
    }
    this.kenoTable = kenoNumbers;
  }

  /**
  * Check the Keno number selected
  * @param coupon
  */
  verifySelectedOdds(coupon: BetCouponExtended): void {
    // extract a temp array that contains
    const tmpRealSel: number[] = coupon.Odds.map(x => Number(x.SelectionName));
    // compare with show table and remove the selected when the selection is delete
    this.kenoTable.forEach(item => {
      const idx = tmpRealSel.find(index => index === item.number);
      if (!idx) {
        item.isSelected = false;
      }
    });
    // update the table selection
    tmpRealSel.forEach(odd => {
      const kenoSel = this.kenoTable.findIndex(obj => obj.number === odd);
      if (kenoSel !== -1) {
        this.kenoTable[kenoSel].isSelected = true;
      }
    });
    // update the queue selection
    this.numberSelectionQueue = this.numberSelectionQueue.filter(
      item => {
        return tmpRealSel.indexOf(item.number) < 0 &&
          this.kenoTable.find(idx => idx.number === item.number && idx.isSelected !== item.isSelected);
      }
    );
  }
}
