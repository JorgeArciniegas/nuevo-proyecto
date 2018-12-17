import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  observableMediaSubscribe: Subscription;
  public rowHeight: number;

  constructor(
    private observableMedia: ObservableMedia,
    public service: ProductsService
  ) {}

  ngOnInit() {
    this.observableMediaSubscribe = this.observableMedia
      .asObservable()
      .subscribe((change: MediaChange) => {
        this.service.breakpoint = this.service.gridByBreakpoint[change.mqAlias];
        this.service.breakpointSubscribe.next(this.service.breakpoint);
        this.service.fnWindowsSize();

        this.rowHeight = (this.service.windowSize.columnHeight - 11) / 12;
      });
  }
  ngOnDestroy(): void {
    this.observableMediaSubscribe.unsubscribe();
  }
}
