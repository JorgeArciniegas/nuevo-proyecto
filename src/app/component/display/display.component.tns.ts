import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import {
  BetOdd,
  BetOdds,
  PolyfunctionalArea
} from '../../products/products.model';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {
  public settings: AppSettings;
  @Input()
  public rowHeight: number;
  // Element for management the display
  polyfunctionalValue: PolyfunctionalArea;
  polyfunctionalValueSubscribe: Subscription;

  constructor(
    private productService: ProductsService,
    public readonly appSettings: AppSettings
  ) {
    this.settings = appSettings;
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        this.polyfunctionalValue = element;
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.polyfunctionalValueSubscribe.unsubscribe();
  }

  detailOdds(): void {
    const data: BetOdds = new BetOdds();
    data.title = this.polyfunctionalValue.selection;
    if (this.polyfunctionalValue.odd) {
      data.odds.push(
        new BetOdd(
          this.polyfunctionalValue.value.toString(),
          this.polyfunctionalValue.odd,
          this.polyfunctionalValue.amount
        )
      );
    } else if (
      this.polyfunctionalValue.odds &&
      this.polyfunctionalValue.odds.length > 0
    ) {
      data.odds = this.polyfunctionalValue.odds;
    }
    this.productService.openProductDialog(data);
  }
}
