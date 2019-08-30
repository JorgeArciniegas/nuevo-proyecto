import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BetDataDialog, PolyfunctionalArea, PolyfunctionalStakeCoupon, PolyfunctionStakePresetPlayer } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { TypeBetSlipColTot } from '../../products/main/main.models';
import { BtncalcService } from '../btncalc/btncalc.service';
import { UserService } from '../../../../src/app/services/user.service';
import { LAYOUT_TYPE } from '../../../../src/environments/environment.models';
import { ElysCouponService } from '@elys/elys-coupon';
import { CouponService } from '../coupon/coupon.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnDestroy {
  @Input()
  public rowHeight: number;
  @Input()
  public timeBlocked = false;
  // Element for management the display
  polyfunctionalValue: PolyfunctionalArea;
  polyfunctionalValueSubscribe: Subscription;
  polyfunctionalStakeCoupon: PolyfunctionalStakeCoupon = new PolyfunctionalStakeCoupon();
  polyfunctionalStakeCouponSubscribe: Subscription;
  polyfunctionStakePresetPlayerSubscribe: Subscription;
  // test amount preset from operator input
  amountPresetPlayer: PolyfunctionStakePresetPlayer;

  // subscribe to changed and placed coupon
  couponHasChangedSubscribe: Subscription;
  couponHasBeenPlaced: Subscription;
  // display from layout's coupon
  typeProductCoupon: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  typeBetSlipColTot: typeof TypeBetSlipColTot = TypeBetSlipColTot;

  constructor(
    public productService: ProductsService,
    private btnService: BtncalcService,
    public userService: UserService,
    private elysCoupon: ElysCouponService,
    private internalServiceCoupon: CouponService
  ) {
    this.amountPresetPlayer = this.btnService.polyfunctionStakePresetPlayer;
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(element => {
      this.polyfunctionalValue = element;
    });
    // stake coupon change and show to display area
    this.polyfunctionalStakeCouponSubscribe = this.productService.polyfunctionalStakeCouponObs.subscribe(elem => {
      this.polyfunctionalStakeCoupon = elem;
    });

    this.polyfunctionStakePresetPlayerSubscribe = this.btnService.polyfunctionStakePresetPlayerObs.subscribe(
      (item: PolyfunctionStakePresetPlayer) => {
        this.amountPresetPlayer = item;
      }
    );

    this.couponHasChangedSubscribe = this.elysCoupon.couponHasChanged.subscribe(coupon => {
      if (coupon) {
        this.polyfunctionalValue.grouping = coupon.Groupings;
      }
    });

    this.couponHasBeenPlaced = this.internalServiceCoupon.couponHasBeenPlacedObs.subscribe(() => {
      this.polyfunctionalValue.grouping = null;
    });
  }

  ngOnDestroy() {
    this.polyfunctionalValueSubscribe.unsubscribe();
    this.polyfunctionalStakeCouponSubscribe.unsubscribe();
    this.polyfunctionStakePresetPlayerSubscribe.unsubscribe();
    this.couponHasChangedSubscribe.unsubscribe();
    this.couponHasBeenPlaced.unsubscribe();
  }

  detailOdds(isGroupings: boolean = false): void {
    let data: BetDataDialog;
    if (!isGroupings) {
      data = {
        title: this.polyfunctionalValue.selection,
        betOdds: { odds: this.polyfunctionalValue.odds }
      };
    } else {
      data = {
        title: 'GROUPINGS',
        groupings: this.elysCoupon.betCoupon.Groupings
      };
    }
    this.productService.openProductDialog(data);
  }
}
