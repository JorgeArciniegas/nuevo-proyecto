import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ResultsService } from './results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input()
  public rowHeight: number;

  constructor(
    public service: ResultsService,
    public productService: ProductsService
  ) {}

  ngOnInit() {}
}
