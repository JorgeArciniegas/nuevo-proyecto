import { Component, Input, OnDestroy } from '@angular/core';
import { BetCouponOdd } from '@elys/elys-api';
import { ElysCouponService } from '@elys/elys-coupon';
import { BetCouponOddExtended } from '@elys/elys-coupon/lib/elys-coupon.models';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { BetOdd } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { OddsStakeEdit } from './coupon.model';
import { CouponService } from './coupon.service';

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
  public errorMessage: string;
  private remove = false;

  // number of odds inserted to coupon
  private couponServiceSubscription: Subscription;
  private couponMessageServiceSubscription: Subscription;
  // private messageType: typeof CouponServiceMessageType = CouponServiceMessageType;

  constructor(
    private elysCoupon: ElysCouponService,
    public couponService: CouponService,
    public readonly settings: AppSettings,
    public productService: ProductsService
  ) {
    if (this.productService.windowSize && this.productService.windowSize.small) {
      this.maxItems = 4;
    }
    this.couponServiceSubscription = this.couponService.couponResponse.subscribe(coupon => {
      if (coupon === null) {
        return;
      }
      this.maxPage = Math.ceil(coupon.Odds.length / this.maxItems);
      if (!this.remove) {
        this.page = 0;
      } else {
        this.remove = false;
      }
      this.filterOdds();
    });
    this.couponMessageServiceSubscription = this.elysCoupon.couponServiceMessage.subscribe(message => {
      // Get the error's message
      if (message.messageType === 4) {
        this.errorMessage = message.message;
      } else {
        this.errorMessage = undefined;
      }
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
  clearCoupon(): void {
    this.couponService.resetCoupon();
  }
  ngOnDestroy(): void {
    this.couponServiceSubscription.unsubscribe();
    this.couponMessageServiceSubscription.unsubscribe();
  }

  // change stake from odd's coupon
  checkOddToChangeStake(odd: BetCouponOdd): void {
    this.couponService.checkOddToChangeStake(odd);
  }

  //open dialog
  openDialog(): void {
    this.productService.openProductDialog({ title: 'COUPON', betCoupon: this.couponService.coupon });
  }
}
