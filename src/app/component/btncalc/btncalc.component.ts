import { Component, OnInit } from '@angular/core';
import { WindowSize } from 'src/app/products/products.model';
import { ProductsService } from 'src/app/products/products.service';

@Component({
  selector: 'app-btncalc',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent implements OnInit {
  breakPoint: number;
  aspect: WindowSize;
  constructor(public productService: ProductsService) {
    this.productService.breakpointSubscribe.subscribe(point => {
      this.breakPoint = point;
      this.aspect = this.productService.aspectRatio();
    });
  }

  ngOnInit() {
    this.breakPoint = this.productService.breakpoint;
    console.log(this.productService.breakpoint);
  }
}
