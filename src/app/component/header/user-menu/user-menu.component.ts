import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { interval } from 'rxjs';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../../products/products.service';
import { IconSize } from '../../model/iconSize.model';
import { UserService } from '../../../../../src/app/services/user.service';
import { ElysCouponService } from '@elys/elys-coupon';
import { StagedCouponStatus } from '@elys/elys-api';
import { StorageService } from '../../../../../src/app/services/utility/storage/storage.service';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, AfterViewInit {
  public settings: AppSettings;
  public myTime: Date = new Date();
  public notifyIcon: IconSize;
  public playableBalance: number;
  constructor(
    public readonly appSettings: AppSettings,
    public productService: ProductsService,
    public userService: UserService,
    private storageService: StorageService,
    private elysCouponService: ElysCouponService
  ) {
    this.settings = appSettings;
  }
  ngAfterViewInit(): void {
    const barHeight =
      this.productService.windowSize.height -
      this.productService.windowSize.columnHeight;
    this.notifyIcon = new IconSize(barHeight, barHeight * 0.7);
  }
  ngOnInit() {
    interval(1000).subscribe(() => this.getTime());
    /**
     * listening for staged coupons variation then check the status, if = Placed substracts the played stake from playable balance
     */
    this.elysCouponService.stagedCouponObs.subscribe(coupons => {
      for (const coupon of coupons.filter(
        item => item.CouponStatusId === StagedCouponStatus.Placed
      )) {
        this.userService.decreasePlayableBalance(coupon.Stake);
      }
    });
  }

  getTime(): void {
    this.myTime = new Date();
  }
}
