import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-dogracing',
  templateUrl: './dogracing.component.html',
  styleUrls: ['./dogracing.component.scss']
})
export class DogracingComponent implements OnInit {
  public rowHeight: number;

  constructor(private route: ActivatedRoute, private service: ProductsService) {
    service.productNameSelectedSubscribe.next(route.snapshot.data.productName);
  }

  ngOnInit() {
    this.rowHeight = (this.service.windowSize.columnHeight - 20 - 17) / 18;
  }
}
