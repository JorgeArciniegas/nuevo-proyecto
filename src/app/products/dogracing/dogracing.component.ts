import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-dogracing',
  templateUrl: './dogracing.component.html',
  styleUrls: ['./dogracing.component.scss']
})
export class DogracingComponent implements OnInit {
  constructor(route: ActivatedRoute, service: ProductsService) {
    service.productNameSelectedSubscribe.next(route.snapshot.data.productName);
  }

  ngOnInit() {}
}
