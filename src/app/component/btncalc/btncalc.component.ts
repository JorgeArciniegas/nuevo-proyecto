import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { Product } from '../../products/models/product.model';
import { ProductsService } from '../../products/products.service';

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
  }

  ngOnInit(): void {}

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
