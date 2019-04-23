import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TypeBetSlipColTot } from '../../products/dogracing/dogracing.models';
import { AppSettings } from '../../app.settings';
import { Product } from '../../products/models/product.model';
import { PolyfunctionalArea } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { IconSize } from '../model/iconSize.model';
import { BtncalcService } from './btncalc.service';

@Component({
  selector: 'app-btncalc',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent implements OnInit, OnDestroy {
  private productNameSelectedSubscribe: Subscription;
  public product: Product;
  public amountIcon: IconSize;
  @Input()
  private rowHeight: number;
  @Input()
  public timeBlocked: boolean;
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
    // manages buttons, data display, amount association/distribution
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        this.polyfunctionalValue = element;
        if (this.polyfunctionalValue) {
          this.isActiveCol = this.polyfunctionalValue.activeAssociationCol;
          this.isActiveTot = this.polyfunctionalValue.activeDistributionTot;
        }
      }
    );
  }

  ngOnInit(): void {
    this.amountIcon = new IconSize(Math.floor(this.rowHeight - 16));
  }
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

  // increments amount in display by preset default values
  btnDefaultAmountsPreset(amount: number): void {
    this.btncalcService.btnDefaultAmountAddition(amount);
  }

  // increments digits in display amount
  btnAmountSet(amount: number): void {
    this.btncalcService.btnAmountDecimals(amount);
  }

  // TOT/distribution & COL/association buttons enabling
  btnTotColSet(betTotColSelected: TypeBetSlipColTot): void {
    this.btncalcService.btnTotColSelection(betTotColSelected);
  }
}
