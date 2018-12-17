import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/products.service';
import { environment } from 'src/environments/environment.develop';

@Component({
  selector: 'app-btncalc',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent implements OnInit, OnDestroy {
  productNameSelectedSubscribe: Subscription;
  product: Product;
  constructor(public productService: ProductsService) {
    this.productNameSelectedSubscribe = this.productService.productNameSelectedObserve.subscribe(
      v => {
        const product: Product[] = environment.products.filter(
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
}
