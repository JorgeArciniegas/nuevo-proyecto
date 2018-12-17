import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { WindowSize } from 'src/app/products/products.model';
import { ProductsService } from 'src/app/products/products.service';
import { environment } from 'src/environments/environment.develop';

@Component({
  selector: 'app-btncalc',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent implements OnInit, OnDestroy {
  breakPoint: number;
  aspect: WindowSize;
  productNameSelectedSubscribe: Subscription;
  product: Product;
  constructor(public productService: ProductsService) {
    this.productService.breakpointSubscribe.subscribe(point => {
      this.breakPoint = point;
      this.aspect = this.productService.aspectRatio();
    });

    this.productNameSelectedSubscribe = this.productService.productNameSelectedObserve.subscribe(
      v => {
        const product: Product[] = environment.products.filter(
          item => item.name === v
        );

        this.product = product[0];
      }
    );
  }

  ngOnInit(): void {
    console.log(this.product);

    this.breakPoint = this.productService.breakpoint;
    console.log(this.productService.breakpoint);
  }
  ngOnDestroy(): void {
    this.productNameSelectedSubscribe.unsubscribe();
  }
}
