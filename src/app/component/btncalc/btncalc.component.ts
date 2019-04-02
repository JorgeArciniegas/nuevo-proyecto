import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { Product } from '../../products/models/product.model';
import { ProductsService } from '../../products/products.service';
import { PolyfunctionalArea } from '../../products/products.model';
import { BtncalcService } from './btncalc.service';

@Component({
  selector: 'app-btncalc',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent implements OnInit, OnDestroy {
  productNameSelectedSubscribe: Subscription;
  product: Product;
  @Input()
  rowHeight: number;
  polyfunctionalValueSubscribe: Subscription;
  polyfunctionalValue: PolyfunctionalArea;
  isActiveTot = false;
  isActiveCol = false;

  constructor(
    public productService: ProductsService,
    public btncalcService: BtncalcService,
    private readonly appSetting: AppSettings
  ) {
    this.productNameSelectedSubscribe = this.productService.productNameSelectedObserve.subscribe(
      v => {
        const product: Product[] = appSetting.products.filter(
          item => item.name === v
        );
        this.product = product[0];
      }
    );
    // manages data display: buttons amount distribution
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        this.polyfunctionalValue = element;
        if (this.polyfunctionalValue) {
          this.isActiveCol = this.polyfunctionalValue.amount ? true : false;
          if (this.polyfunctionalValue.odds) {
            this.isActiveTot = this.polyfunctionalValue.amount ? true : false;
            console.log(this.polyfunctionalValue.odds.length);
          } else {
            this.isActiveTot = false;
          }
        }
        console.log(this.polyfunctionalValue);
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.productNameSelectedSubscribe.unsubscribe();
    // this.polyfunctionalValueSubscribe.unsubscribe();
  }

  plus(): void {
    this.productService.closeProductDialog();
    this.productService.resetBoard();
  }

  clearAll(): void {
    this.productService.closeProductDialog();
    this.productService.resetBoard();
    this.isActiveTot = false;
    this.isActiveCol = false;
  }

  // increments amount in display by preset default values
  btnDefaultAmountsPreset(amount: number): void {
    this.btncalcService.btnDefaultAmountAddition(amount);
    console.log(this.product);
  }

  // increments amount in display by preset default values
  btnAmountSet(amount: number): void {
    this.btncalcService.btnAmountDecimals(amount);
  }

  // TOT & COL buttons on/off
  btnTotCol(betTotCol: string): void {
    this.polyfunctionalValue.betColTot = betTotCol;
  }
}
