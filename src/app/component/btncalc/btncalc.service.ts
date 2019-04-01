import { Product } from '../../products/models/product.model';
import { ProductsService } from '../../products/products.service';
import { Subscription } from 'rxjs';
import { PolyfunctionalArea } from '../../products/products.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BtncalcService {
  polyfunctionalValueSubscribe: Subscription;
  polyfunctionalValue: PolyfunctionalArea;
  iniPresetAmountProduct: number;
  polyfunctionalAdditionFlag: boolean;
  polyfunctionalDecimalsFlag: boolean;
  stringWholeDecimals: string;
  numberWholeDecimals: number;
  conversionDecimals: string;

  constructor(public productService: ProductsService) {
    // manages display data updating
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        this.polyfunctionalValue = element;
        if (this.polyfunctionalValue) {
          this.iniPresetAmountProduct = this.polyfunctionalValue.amount;
          this.polyfunctionalAdditionFlag = true;
          this.polyfunctionalDecimalsFlag = true;
        }
      }
    );
  }

  // increments amount in display by preset default bottons values
  btnDefaultAmountAddition(amount: number): void {
    this.polyfunctionalDecimalsFlag = true; // resets decimals to 0
    // if bet present in display...
    if (this.polyfunctionalValue) {
      // if bet displayed for the first time.....
      if (this.polyfunctionalAdditionFlag === true) {
        this.polyfunctionalValue.amount = 0; // resets amount to 0
        // if preset button value 1 and amount 0, pre-add 1 to increment sum
        if (this.polyfunctionalAdditionFlag === true && amount === 1) {
          this.polyfunctionalValue.amount =
            this.polyfunctionalValue.amount + amount;
        }
        // resets flag to stop reseting amount to 0
        this.polyfunctionalAdditionFlag = false;
      }

      // increments amount by preset key values
      this.polyfunctionalValue.amount =
        this.polyfunctionalValue.amount + amount;
    }
  }

  btnAmountDecimals(amount: number): void {
    this.polyfunctionalAdditionFlag = true; // resets addition to 0
    // if bet present in display...
    if (this.polyfunctionalValue) {
      // if bet displayed for the first time.....
      if (this.polyfunctionalDecimalsFlag === true) {
        this.polyfunctionalValue.amount = 0; // resets amount to 0
        this.stringWholeDecimals = ''; // sets decimals string
        this.polyfunctionalDecimalsFlag = false; // resets flag
      }

      /*
       * converts amount to string, concatenates to accumalated decimal string
       * converts accumulated decimal string back to number
       * algorithm to covert last two digits of number to decimals
       * assigns it back to amount
       */
      this.stringWholeDecimals = this.stringWholeDecimals + String(amount);
      this.conversionDecimals = this.stringWholeDecimals;
      this.numberWholeDecimals = Number(this.conversionDecimals) / 100;
      this.polyfunctionalValue.amount = this.numberWholeDecimals;
    }
  }
}
