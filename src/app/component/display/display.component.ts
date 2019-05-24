import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import {
  BetOdd,
  BetOdds,
  PolyfunctionalArea,
  PolyfunctionalStakeCoupon,
  BetDataDialog
} from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { TypeBetSlipColTot } from '../../products/racing/racing.models';

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
  typeBetSlipColTot: typeof TypeBetSlipColTot = TypeBetSlipColTot;
  constructor(
    private productService: ProductsService,
    public readonly settings: AppSettings
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
        // console.log(this.polyfunctionalStakeCoupon);
      }
    );
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.polyfunctionalValueSubscribe.unsubscribe();
    this.polyfunctionalStakeCouponSubscribe.unsubscribe();
  }

  detailOdds(): void {
    const data: BetDataDialog = {
      title:  this.polyfunctionalValue.selection,
      betOdds: { odds: this.polyfunctionalValue.odds},

    };
    this.productService.openProductDialog(data);
  }
}
