import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TypeBetSlipColTot } from '../../products/dogracing/dogracing.models';
import { PolyfunctionalArea, PolyfunctionalStakeCoupon } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';

@Injectable({
  providedIn: 'root'
})
export class BtncalcService implements OnDestroy {
  polyfunctionalValueSubscribe: Subscription;
  polyfunctionalArea: PolyfunctionalArea;
  iniPresetAmountProduct: number;
  polyfunctionalAdditionFlag: boolean;
  polyfunctionalDecimalsFlag: boolean;
  stringWholeDecimals: string;
  numberWholeDecimals: number;
  conversionDecimals: string;

  polyfunctionalStakeCoupon: PolyfunctionalStakeCoupon = new PolyfunctionalStakeCoupon();

  constructor(public productService: ProductsService) {
    this.polyfunctionalDecimalsFlag = true;
    this.polyfunctionalAdditionFlag = true;
    // manages data display: amount addition/decimals and amount distribution
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        this.polyfunctionalArea = element;
        if (this.polyfunctionalArea) {
          if (this.polyfunctionalArea.odds !== undefined) {
            this.polyfunctionalArea.activeDistributionTot = true;
            this.polyfunctionalArea.activeAssociationCol = true;
          } else {
            this.polyfunctionalArea.activeDistributionTot = false;
            this.polyfunctionalArea.activeAssociationCol = true;
          }
          // update type Betslip on change distribution amount for COL or TOT
          if (
            this.polyfunctionalArea.typeSlipCol === TypeBetSlipColTot.TOT &&
            this.polyfunctionalArea.odds !== undefined
          ) {
            this.polyfunctionalArea.odds.map(item => {
              item.amount =
                this.polyfunctionalArea.amount /
                this.polyfunctionalArea.odds.length;
            });
          } else if (this.polyfunctionalArea.odds !== undefined) {
            this.polyfunctionalArea.odds.map(item => {
              item.amount = this.polyfunctionalArea.amount;
            });
          }
        }
      }
    );
    this.productService.polyfunctionalStakeCouponObs.subscribe(
      elem => {
        this.polyfunctionalStakeCoupon = elem;
      }
    );
  }

  ngOnDestroy(): void {
    this.polyfunctionalValueSubscribe.unsubscribe();
  }

  // increments amount in display by preset default bottons values
  btnDefaultAmountAddition(amount: number): void {
    this.polyfunctionalDecimalsFlag = true; // resets decimals to 0
    // if bet present in display...
    if (this.polyfunctionalArea) {
      // if bet displayed for the first time.....
      if (this.polyfunctionalAdditionFlag) {
        this.polyfunctionalArea.amount = 0; // resets amount to 0
        // if preset button value 1 and amount 0, pre-add 1 to increment sum
        if (amount === 1) {
          this.polyfunctionalArea.amount =
            this.polyfunctionalArea.amount + amount;
        }
        // resets flag to stop reseting amount to 0
        this.polyfunctionalAdditionFlag = false;
      }

      // increments amount by preset key values
      this.polyfunctionalArea.amount = this.polyfunctionalArea.amount + amount;
      this.productService.polyfunctionalAreaSubject.next(
        this.polyfunctionalArea
      );
      // this.selectedAmountSubject.next(this.polyfunctionalValue.amount);
    }
  }

  btnAmountDecimals(amount: number): void {
    this.polyfunctionalAdditionFlag = true; // resets addition to 0
    // if bet present in display...
    if (this.polyfunctionalArea) {
      // if bet displayed for the first time.....
      if (this.polyfunctionalDecimalsFlag) {
        this.polyfunctionalArea.amount = 0; // resets amount to 0
        this.stringWholeDecimals = ''; // sets decimals string
        this.polyfunctionalDecimalsFlag = false; // resets flag
      }

      /*
       * converts amount to string, concatenates to accumalated decimal string
       * converts accumulated decimal string back to number
       * algorithm to covert last two digits of number to decimals
       * assigns it back to amount
       */
      this.polyfunctionalArea.amount = this.returnNumberToPolyfuncArea(amount);
      this.productService.polyfunctionalAreaSubject.next(
        this.polyfunctionalArea
      );
    }
  }

  btnAmountDecimalsChangeOdd(amount: number, oddStake: number): number {
    const tmpNumberLength = (oddStake * 100).toFixed()
    .toString()
    .replace('.', '');
    const stringTmpNumber = tmpNumberLength.toString() + amount.toString();
    return Number(stringTmpNumber) / 100;
  }

  // TOT & COL buttons on/off
  btnTotColSelection(betTotColSelected: TypeBetSlipColTot): void {
    if (this.polyfunctionalArea) {
      this.polyfunctionalArea.typeSlipCol = betTotColSelected;
      this.productService.polyfunctionalAreaSubject.next(this.polyfunctionalArea);
    }

  }

  private returnNumberToPolyfuncArea(amount: number): number {
    const tmpNumberLength = (this.polyfunctionalArea.amount * 100)
      .toFixed()
      .toString()
      .replace('.', '');
    const stringTmpNumber = tmpNumberLength.toString() + amount.toString();
    return Number(stringTmpNumber) / 100;
  }


}
