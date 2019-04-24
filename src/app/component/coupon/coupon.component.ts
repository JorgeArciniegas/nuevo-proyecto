import { Component, Input, OnDestroy } from '@angular/core';
import { ElysCouponService } from '@elys/elys-coupon';
import { BetCouponOddExtended } from '@elys/elys-coupon/lib/elys-coupon.models';
import { Subscription } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { BetOdd } from 'src/app/products/products.model';
import { CouponService } from './coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnDestroy {
  @Input()
  public rowHeight: number;
  private settings: AppSettings;
  public maxItems = 5;
  public page = 0;
  public maxPage = 0;
  public listOdds: BetCouponOddExtended[] = [];
  public errorMessage: string;

  private couponServiceSubscription: Subscription;
  private couponMessageServiceSubscription: Subscription;
  // private messageType: typeof CouponServiceMessageType = CouponServiceMessageType;

  constructor(
    private elysCoupon: ElysCouponService,
    public couponService: CouponService,
    private readonly appSettings: AppSettings
  ) {
    this.settings = this.appSettings;
    this.couponServiceSubscription = this.couponService.couponResponse.subscribe(
      coupon => {
        this.maxPage = Math.ceil(coupon.Odds.length / this.maxItems);
        this.page = 0;
        this.filterOdds();
      }
    );
    this.couponMessageServiceSubscription = this.elysCoupon.couponeServiceMessage.subscribe(
      message => {
        console.log(message);
        // Get the error's message
        if (message.messageType === 4) {
          this.errorMessage = message.message;
        }
      }
    );
  }

  filterOdds(): void {
    let index = 0;
    const end: number =
      this.couponService.coupon.Odds.length - this.page * this.maxItems;
    const start: number =
      this.couponService.coupon.Odds.length - (this.page + 1) * this.maxItems;

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
    this.couponService.addRemoveToCoupon([
      new BetOdd(odd.SelectionName, odd.OddValue, odd.OddStake, odd.SelectionId)
    ]);
  }

  ngOnDestroy(): void {
    this.couponServiceSubscription.unsubscribe();
    this.couponMessageServiceSubscription.unsubscribe();
  }
}
