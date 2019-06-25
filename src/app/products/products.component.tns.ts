import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../app.settings';
import { CouponService } from '../component/coupon/coupon.service';
import { ProductsService } from './products.service';
import { DialogService } from './dialog.service';
import { CouponDialogService } from '../component/coupon/coupon-dialog.service.tns';
import { DialogTypeCoupon } from './products.model';
import { MessageSource } from '@elys/elys-coupon';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public rowHeight: number;
  public settings: AppSettings;
  public messageSource: typeof MessageSource = MessageSource;

  dialogTypeCoupon: typeof DialogTypeCoupon = DialogTypeCoupon;

  constructor(
    public service: ProductsService,
    public readonly appSettings: AppSettings,
    public readonly userService: UserService,
    public readonly couponService: CouponService,
    public dialog: DialogService,
    public couponDialogService: CouponDialogService
  ) {
    this.settings = appSettings;

    this.service.fnWindowsSize();
    this.rowHeight = (this.service.windowSize.columnHeight - 30) / 11;
  }

  payCancelCoupon(type: DialogTypeCoupon): void {
    this.couponDialogService.openPayCancelDialog(type);
  }
}
