import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  constructor(private observableMedia: ObservableMedia) {}

  ngOnInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      //
    });
  }
}
