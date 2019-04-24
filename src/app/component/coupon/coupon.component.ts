import { Component, Input, OnDestroy } from '@angular/core';
import { BetCouponOdd } from '@elys/elys-api';
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
  private settings: AppSettings;
  public maxItems = 5;
  public page = 0;
  public maxPage = 0;
  public listOdds: BetCouponOddExtended[] = [];
  // number of odds inserted to coupon
  private couponServiceSubscription: Subscription;

  constructor(
    public couponService: CouponService,
    private readonly appSettings: AppSettings,
    public productService: ProductsService
  ) {
    this.settings = this.appSettings;
    if (this.productService.windowSize.small) {
      this.maxItems = 4;
    }
    this.couponServiceSubscription = this.couponService.couponResponse.subscribe(coupon => {
      this.maxPage = Math.ceil(coupon.Odds.length / this.maxItems);
      this.page = 0;
      this.filterOdds();
    });
  }

  filterOdds(): void {
    let index = 0;
    const end: number = this.couponService.coupon.Odds.length - (this.page * this.maxItems);
    const start: number = this.couponService.coupon.Odds.length - ((this.page + 1) * this.maxItems);

    this.listOdds = this.couponService.coupon.Odds.filter(() => {
      index++;
      return (index > start && index <= end);
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
    this.couponService.addRemoveToCoupon([new BetOdd(odd.SelectionName, odd.OddValue, odd.OddStake, odd.SelectionId)]);
  }
  clearCoupon(): void {
    this.couponService.resetCoupon();
  }
  ngOnDestroy(): void {
    this.couponServiceSubscription.unsubscribe();
  }

  // change stake from odd's coupon
  checkOddToChangeStake(odd: BetCouponOdd): void {

    const tempOdd: OddsStakeEdit = { indexOdd: -1, tempStake: 0.00, odd: null, isDefaultInput: false };
    // search if the odd is selected and it reset
    if (this.couponService.oddStakeEdit && this.couponService.oddStakeEdit.odd.SelectionId === odd.SelectionId) {
      this.couponService.oddStakeEditSubject.next(null);
      return;
    }
    // filter the odd to coupon and extract the index and value
    this.couponService.coupon.Odds.filter((item: BetCouponOddExtended, idx) => {
      if (item.SelectionId === odd.SelectionId) {
        console.log(idx, item);
        tempOdd.indexOdd = idx;
        tempOdd.odd = item;
      }
    });

    this.couponService.oddStakeEditSubject.next(tempOdd);
  }
}
