import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { Product } from '../../products/models/product.model';
import { ProductsService } from '../../products/products.service';
import { IconSize } from '../model/iconSize.model';

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

  constructor(public productService: ProductsService, private readonly appSetting: AppSettings) {
    this.productNameSelectedSubscribe = this.productService.productNameSelectedObserve.subscribe(v => {
      const product: Product[] = appSetting.products.filter(item => item.name === v);
      this.product = product[0];
    });
  }

  ngOnInit(): void {
    this.amountIcon = new IconSize(Math.floor(this.rowHeight - 16));
  }
  ngOnDestroy(): void {
    this.productNameSelectedSubscribe.unsubscribe();
  }

  plus(): void {
    this.productService.closeProductDialog();
    this.productService.resetBoard();
  }

  clearAll(): void {
    this.productService.closeProductDialog();
    this.productService.resetBoard();
  }
}
