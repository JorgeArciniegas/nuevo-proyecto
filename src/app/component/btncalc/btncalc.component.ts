import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { Product } from '../../products/models/product.model';
import { ProductsService } from '../../products/products.service';
import { PolyfunctionalArea } from '../../products/products.model';

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
  // Element for management the display
  polyfunctionalValue: PolyfunctionalArea;
  polyfunctionalValueSubscribe: Subscription;
  iniPresetAmount = false;
  iniPresetAmountProduct: number;

  constructor(
    public productService: ProductsService,
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

    // manages display data updating
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        this.polyfunctionalValue = element;
        if (this.polyfunctionalValue) {
          this.iniPresetAmountProduct = this.polyfunctionalValue.amount;
        }
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.productNameSelectedSubscribe.unsubscribe();
    this.polyfunctionalValueSubscribe.unsubscribe();
  }

  plus(): void {
    this.productService.closeProductDialog();
    this.productService.resetBoard();
  }

  clearAll(): void {
    this.productService.closeProductDialog();
    this.productService.resetBoard();
  }

  // increments amount in display by preset default btncalc amounts values
  btnAmountDefaultAddition(amount: number): void {
    if (this.polyfunctionalValue) {
      // resets amount when new bet
      // this.iniPresetAmountProduct = this.polyfunctionalValue.amount;
      if (this.iniPresetAmountProduct === this.polyfunctionalValue.amount) {
        console.log(this.iniPresetAmountProduct);
        this.polyfunctionalValue.amount = 0;
      }

      // ini amount before preset keys increment
      if (this.iniPresetAmount === false) {
        this.iniPresetAmount = true;
        this.polyfunctionalValue.amount = 0;
      }

      // increments by preset key values
      this.polyfunctionalValue.amount =
        this.polyfunctionalValue.amount + amount;
    }
  }
}
