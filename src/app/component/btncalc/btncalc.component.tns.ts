import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { AppSettings } from '../../app.settings';
import { Product } from '../../products/models/product.model';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-btncalc',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent implements OnInit, OnDestroy, AfterViewInit {
  productNameSelectedSubscribe: Subscription;
  product: Product = { label: '', name: '', defaultAmount: [0, 0, 0, 0] };

  @ViewChild('gridbtn') gridview: ElementRef;

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

  ngOnInit(): void {
    const grid: GridLayout = this.gridview.nativeElement;
    console.log(grid.getMeasuredHeight(), grid.effectiveHeight, grid.height);
  }

  ngOnDestroy(): void {
    this.productNameSelectedSubscribe.unsubscribe();
  }

  ngAfterViewInit() {
    const grid: GridLayout = this.gridview.nativeElement;
    console.log(grid.getMeasuredHeight(), grid.effectiveHeight, grid.height);

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
