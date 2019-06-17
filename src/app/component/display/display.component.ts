import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { BetDataDialog, PolyfunctionalArea, PolyfunctionalStakeCoupon, PolyfunctionStakePresetPlayer } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { TypeBetSlipColTot } from '../../products/racing/racing.models';
import { BtncalcService } from '../btncalc/btncalc.service';
import { UserService } from '../../../../src/app/services/user.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {
  // public settings: AppSettings;
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
  typeBetSlipColTot: typeof TypeBetSlipColTot = TypeBetSlipColTot;

  // test amount preset from operator input
  amountPresetPlayer: PolyfunctionStakePresetPlayer;

  constructor(
    public productService: ProductsService,
    private btnService: BtncalcService,
    public readonly settings: AppSettings,
    public userService: UserService
  ) {

    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        this.polyfunctionalValue = element;
      }

    );
      // stake coupon change and show to display area
    this.polyfunctionalStakeCouponSubscribe = this.productService.polyfunctionalStakeCouponObs.subscribe(
      elem => {
        this.polyfunctionalStakeCoupon = elem;
      }
    );


    this.polyfunctionStakePresetPlayerSubscribe = this.btnService.polyfunctionStakePresetPlayerObs.subscribe(
      (item: PolyfunctionStakePresetPlayer) => {
        this.amountPresetPlayer = item;
      }
    );
  }

  ngOnInit() {

   }

  ngOnDestroy() {
    this.polyfunctionalValueSubscribe.unsubscribe();
    this.polyfunctionalStakeCouponSubscribe.unsubscribe();
    this.polyfunctionStakePresetPlayerSubscribe.unsubscribe();
  }

  detailOdds(): void {
    const data: BetDataDialog = {
      title:  this.polyfunctionalValue.selection,
      betOdds: { odds: this.polyfunctionalValue.odds},

    };
    this.productService.openProductDialog(data);
  }
}
