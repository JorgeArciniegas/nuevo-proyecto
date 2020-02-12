import { Component, Input, OnDestroy } from '@angular/core';
import { BetCouponOdd, CouponType } from '@elys/elys-api';
import { BetCouponOddExtended } from '@elys/elys-coupon/lib/elys-coupon.models';
import { Subscription } from 'rxjs';
import { LAYOUT_TYPE, TypeCoupon } from '../../../../src/environments/environment.models';
import { AppSettings } from '../../app.settings';
import { ColourGameId } from '../../products/main/colour-game.enum';
import { BetOdd, PolyfunctionalArea } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { UserService } from '../../services/user.service';
import { WindowSizeService } from '../../services/utility/window-size/window-size.service';
import { CouponService } from './coupon.service';
import { Colour } from '../../products/main/playable-board/templates/colours/colours.models';

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
  Math = Math;

  // number of odds inserted to coupon
  private couponServiceSubscription: Subscription;
  private couponMessageServiceSubscription: Subscription;

  // Type coupon
  public get couponLayout(): TypeCoupon {
    return this.productService.product.typeCoupon;
  }

  layoutProduct: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  couponTypeId: typeof CouponType = CouponType;
  colourGameId: typeof ColourGameId = ColourGameId;

  constructor(
    public couponService: CouponService,
    public readonly settings: AppSettings,
    public productService: ProductsService,
    public userService: UserService,
    public windowSizeService: WindowSizeService
  ) {
    if (this.windowSizeService.windowSize.small) {
      this.maxItems = 4;
    }

    this.couponServiceSubscription = this.couponService.couponResponse.subscribe(coupon => {
      if (coupon === null) {
        return;
      }
      if (coupon.internal_isLottery) {
        this.maxItems = 10;
        const polyFunc: PolyfunctionalArea = this.productService.polyfunctionalAreaSubject.getValue();
        polyFunc.oddsCounter = coupon.Odds.length;
      } else if (coupon.internal_isColours) {
        this.maxItems = 15;
        const polyFunc: PolyfunctionalArea = this.productService.polyfunctionalAreaSubject.getValue();
        polyFunc.oddsCounter = coupon.Odds.length;
      } else {
        this.maxItems = this.windowSizeService.windowSize.small ? 4 : 5;
      }
      this.maxPage = Math.ceil(coupon.Odds.length / this.maxItems);
      if (!this.remove) {
        this.page = 0;
      } else {
        this.remove = false;
      }
      this.filterOdds();
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

  public getNumberColour(number: string): string {
    const colourNumber: number = parseInt(number, 10);
    if (colourNumber === 49) {
      return Colour[Colour.YELLOW];
    }
    if (colourNumber % 3 === 1) {
      return Colour[Colour.RED];
    }
    if (colourNumber % 3 === 2) {
      return Colour[Colour.BLUE];
    }
    if (colourNumber % 3 === 0) {
      return Colour[Colour.GREEN];
    }
  }

  isBetDisabledForColoursDrangn(): boolean {

    if (this.listOdds && this.listOdds.length > 0 && this.listOdds[0].MarketName === ColourGameId[ColourGameId.dragon]) {
      if ((this.listOdds.length >= 6 && this.listOdds.length <= 10) || this.listOdds.length === 15) {
        return false;
      }
      return true;
    }

    return false;
  }
}
