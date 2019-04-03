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
  displayDefaultAmount: number;
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
        this.displayDefaultAmount = product[0].defaultAmount[0];
        // this.displayDefaultAmount = 5;
      }
    );
    // manages buttons COL/TOT, label amount in display, amount association/distribution
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        this.polyfunctionalValue = element;
        if (this.polyfunctionalValue) {
          this.isActiveCol = this.polyfunctionalValue.activeAssociationCol;
          this.isActiveTot = this.polyfunctionalValue.activeDistributionTot;
          this.polyfunctionalValue.amount = this.displayDefaultAmount;
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
    this.isActiveTot = false;
    this.isActiveCol = false;
  }

  defaultAmount(): void {
    this.polyfunctionalValue.amount = 1;
  }

  // increments amount in display by preset default values
  btnDefaultAmountsPreset(amount: number): void {
    this.btncalcService.btnDefaultAmountAddition(amount);
  }

  // increments digits in display amount
  btnAmountSet(amount: number): void {
    this.btncalcService.btnAmountDecimals(amount);
  }

  // TOT/distribution & COL/association buttons enabling
  btnTotColSet(betTotColSelected: string): void {
    this.btncalcService.btnTotColSelection(betTotColSelected);
  }
}
