import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import {
  BetOdd,
  BetOdds,
  PolyfunctionalArea
} from 'src/app/products/products.model';
import { ProductsService } from 'src/app/products/products.service';

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
    data.title = 'Accoppiata vincente';
    for (let index = 0; index < 30; index++) {
      const item: BetOdd = new BetOdd('1-2-3', index + 1, 2);
      data.odds.push(item);
    }
    this.productService.openProductDialog(data);
  }
}
