import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  @Input()
  public rowHeight: number;

  constructor(
    public racingService: MainService,
    public productService: ProductsService
  ) {}

  ngOnInit() {}
}
