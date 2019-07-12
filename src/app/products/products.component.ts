import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AppSettings } from '../app.settings';
import { ProductsService } from './products.service';
import { CouponService } from '../component/coupon/coupon.service';
import { CouponDialogService } from '../component/coupon/coupon-dialog.service';
import { MessageSource } from '@elys/elys-coupon';
import { UserService } from '../services/user.service';
import { DialogTypeCoupon } from './products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnDestroy {
  observableMediaSubscribe: Subscription;
  public rowHeight: number;
  public settings: AppSettings;
  public messageSource: typeof MessageSource = MessageSource;
  dialogTypeCoupon: typeof DialogTypeCoupon = DialogTypeCoupon;
  constructor(
    private observableMedia: MediaObserver,
    public service: ProductsService,
    public readonly appSettings: AppSettings,
    public readonly userService: UserService,
    public readonly couponService: CouponService,
    public readonly couponDialogService: CouponDialogService
  ) {
    this.settings = appSettings;

    this.observableMediaSubscribe = this.observableMedia.media$.subscribe(
      (change: MediaChange) => {
        this.service.breakpoint = this.service.gridByBreakpoint[change.mqAlias];
        this.service.fnWindowsSize();
        this.rowHeight = (this.service.windowSize.columnHeight - 30) / 12;
      }
    );
  }

  ngOnDestroy(): void {
    this.observableMediaSubscribe.unsubscribe();
  }

  payCancelCoupon(type): void {
    this.changeClassApp('modal-center');
    this.couponDialogService.openPayCancelDialog(type);
    this.couponDialogService.dialogRef.afterClosed().subscribe(evt => {
      this.changeClassApp('modal-center');
    });
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
