import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { CouponService } from '../../component/coupon/coupon.service';
import { DialogService } from '../dialog.service';
import { DialogData } from '../products.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.tns.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  @Input()
  private data: DialogData;

  public settings: AppSettings;
  public rowNumber = 3;
  public columnNumber = 3;
  private maxItems = 0;
  public page = 0;
  public maxPage = 0;

  public title: string;
  constructor(
    private dialog: DialogService,
    private productService: ProductsService,
    public readonly appSettings: AppSettings,
    public readonly couponService: CouponService
  ) {
    this.settings = appSettings;
    if (this.productService.windowSize && this.productService.windowSize.small) {
      this.rowNumber = 2;
    }

  }

  ngOnInit(): void {
    this.title = this.data.title;
  }

  close(): void {
    this.couponService.oddStakeEditSubject.next(null);
    this.dialog.showDialog = false;
  }
}
