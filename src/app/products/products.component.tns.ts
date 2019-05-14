import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../app.settings';
import { CouponService } from '../component/coupon/coupon.service';
import { ProductsService } from './products.service';
import { DialogService } from './dialog.service';
import { CouponDialogService } from '../component/coupon/coupon-dialog.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public rowHeight: number;
  public settings: AppSettings;

  constructor(
    public service: ProductsService,
    public readonly appSettings: AppSettings,
    public readonly couponService: CouponService,
    public dialog: DialogService,
    public couponDialogService: CouponDialogService
  ) {
    this.settings = appSettings;

    this.service.fnWindowsSize();
    this.rowHeight = (this.service.windowSize.columnHeight - 30) / 11;
  }

  payCancelCoupon(type): void {
    this.changeClassApp('modal-center');
    // this.couponDialogService.showDialog = true;
    this.couponDialogService.openPayCancelDialog(type);
    /*  this.couponDialogService.dialogRef.afterClosed().subscribe(evt => {
      this.changeClassApp('modal-center');
    }); */
  }

  private changeClassApp(newClass: string): void {
    const elem: HTMLElement = document.querySelector('body');

    if (elem.classList.contains(newClass)) {
      elem.classList.remove(newClass);
    } else {
      elem.classList.add(newClass);
    }
  }
}
