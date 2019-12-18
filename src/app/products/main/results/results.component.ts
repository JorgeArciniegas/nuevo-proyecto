import { Component, Input } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ResultsService } from './results.service';

@Component({
  moduleId: module.id,
  selector: 'app-results, [app-results]',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @Input()
  public rowHeight: number;

  constructor(
    public service: ResultsService,
    public productService: ProductsService
  ) { }
}
