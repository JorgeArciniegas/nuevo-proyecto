import { Component, Input, OnDestroy } from '@angular/core';
import { BetCouponOdd, CouponType } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { BetCouponOddExtended } from '@elys/elys-coupon/lib/elys-coupon.models';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { BetOdd } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { CouponService } from './coupon.service';
import { UserService } from '../../services/user.service';
import { TypeCoupon, LAYOUT_TYPE } from '../../../../src/environments/environment.models';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnDestroy {
  @Input()
  public rowHeight: number;
  @Input()
  public timeBlocked: boolean;
  public maxItems = 5;
  public page = 0;
  public maxPage = 0;
  public listOdds: BetCouponOddExtended[] = [];
  private remove = false;

  // number of odds inserted to coupon
  private couponServiceSubscription: Subscription;
  private couponMessageServiceSubscription: Subscription;

  // Type coupon
  couponLayout: TypeCoupon;
  layoutProduct: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  productChange: Subscription;
  couponTypeId: typeof CouponType = CouponType;
  constructor(
    private elysCoupon: ElysCouponService,
    public couponService: CouponService,
    public readonly settings: AppSettings,
    public productService: ProductsService,
    public userService: UserService
  ) {
    if (this.productService.windowSize && this.productService.windowSize.small) {
      this.maxItems = 4;
    }

    this.couponServiceSubscription = this.couponService.couponResponse.subscribe(coupon => {
      if (coupon === null) {
        return;
      }
      if (coupon.internal_isLottery) {
        this.maxItems = 10;
      } else {
        this.maxItems = 5;
      }
      this.maxPage = Math.ceil(coupon.Odds.length / this.maxItems);
      if (!this.remove) {
        this.page = 0;
      } else {
        this.remove = false;
      }
      this.filterOdds();
    });

    // management coupon layout
    this.couponLayout = this.productService.product.typeCoupon;

    this.productChange = this.productService.productNameSelectedObserve.subscribe(() => {
      this.couponLayout = this.productService.product.typeCoupon;
    });
  }

  filterOdds(): void {
    let index = 0;
    const end: number = this.couponService.coupon.Odds.length - this.page * this.maxItems;
    const start: number = this.couponService.coupon.Odds.length - (this.page + 1) * this.maxItems;

    this.listOdds = this.couponService.coupon.Odds.filter(() => {
      index++;
      return index > start && index <= end;
    }).reverse();
  }

  previusOdds(): void {
    if (this.page <= 0) {
      return;
    }
    this.page--;
    this.filterOdds();
  }

  nextOdds(): void {
    if (this.page >= this.maxPage - 1) {
      return;
    }
    this.page++;
    this.filterOdds();
  }

  removeOdd(odd: BetCouponOddExtended): void {
    this.remove = true;
    this.couponService.addRemoveToCoupon([new BetOdd(odd.SelectionName, odd.OddValue, odd.OddStake, odd.SelectionId)]);
  }

  removeOddByLottery(odd: BetCouponOddExtended): void {
    this.remove = true;
    if (this.couponService.coupon.Odds.length === 1) {
      this.clearCoupon();
      return;
    }
    this.couponService.addToRemoveToCouponLottery(odd.SelectionId, Number(odd.SelectionName));
  }

  clearCoupon(): void {
    this.couponService.resetCoupon();
  }

  ngOnDestroy(): void {
    this.clearCoupon();
    this.couponServiceSubscription.unsubscribe();
    this.productChange.unsubscribe();
    // this.couponMessageServiceSubscription.unsubscribe();
  }

  // change stake from odd's coupon
  checkOddToChangeStake(odd: BetCouponOdd): void {
    this.couponService.checkOddToChangeStake(odd);
  }

  // open dialog
  openDialog(): void {
    if (this.couponService.coupon) {
      this.productService.openProductDialog({ title: 'COUPON', betCoupon: this.couponService.coupon });
    }
  }
}
