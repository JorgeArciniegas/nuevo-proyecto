import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { CouponService } from '../component/coupon/coupon.service';
import { ProductsService } from './products.service';
import { DialogService } from './dialog.service';
import { CouponDialogService } from '../component/coupon/coupon-dialog.service.tns';
import { DialogTypeCoupon } from './products.model';
import { MessageSource } from '@elys/elys-coupon';
import { UserService } from '../services/user.service';
import { MainService } from './main/main.service';
import { Subscription, timer } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-products, [app-products]',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterContentInit, OnDestroy {
  public rowHeight: number;
  public messageSource: typeof MessageSource = MessageSource;

  dialogTypeCoupon: typeof DialogTypeCoupon = DialogTypeCoupon;

  // Delay render view
  delayRender = false;
  delaySubscription: Subscription;

  constructor(
    public service: ProductsService,
    public mainService: MainService,
    public readonly userService: UserService,
    public readonly couponService: CouponService,
    public dialog: DialogService,
    public couponDialogService: CouponDialogService
  ) {
    this.service.fnWindowsSize();
    this.rowHeight = (this.service.windowSize.columnHeight - 30) / 11;
  }


  ngAfterContentInit() {
    this.delaySubscription = timer(1000).subscribe(() => {
      this.delayRender = true;
    });
  }

  payCancelCoupon(type: DialogTypeCoupon): void {
    this.couponDialogService.openPayCancelDialog(type);
  }

  ngOnDestroy() {
    this.delaySubscription.unsubscribe();
  }
}
