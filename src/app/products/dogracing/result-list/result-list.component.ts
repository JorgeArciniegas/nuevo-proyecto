import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { DogracingService } from '../dogracing.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  @Input()
  public rowHeight: number;

  constructor(
    public dogracingService: DogracingService,
    public productService: ProductsService
  ) {}

  ngOnInit() {}
}
