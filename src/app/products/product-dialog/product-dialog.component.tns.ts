import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { CouponService } from '../../component/coupon/coupon.service';
import { WindowSizeService } from '../../services/utility/window-size/window-size.service';
import { DialogService } from '../dialog.service';
import { DialogData } from '../products.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.tns.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  @Input()
  public data: DialogData;

  public settings: AppSettings;
  public rowNumber = 3;
  public columnNumber = 3;
  private maxItems = 0;
  public page = 0;
  public maxPage = 0;

  public title: string;
  constructor(
    private dialog: DialogService,
    private windowSizeService: WindowSizeService,
    public readonly appSettings: AppSettings,
    public readonly couponService: CouponService
  ) {
    this.settings = appSettings;
    if (this.windowSizeService.windowSize.small) {
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
