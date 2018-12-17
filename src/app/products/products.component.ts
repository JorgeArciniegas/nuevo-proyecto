import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public rowHeight: number;

  constructor(
    private observableMedia: ObservableMedia,
    public service: ProductsService
  ) {}

  ngOnInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.service.breakpoint = this.service.gridByBreakpoint[change.mqAlias];
      this.service.breakpointSubscribe.next(this.service.breakpoint);
      console.log(this.service.fnWindowsSize());

      this.rowHeight = (this.service.windowSize.columnHeight - 11) / 12;
    });
  }
}
