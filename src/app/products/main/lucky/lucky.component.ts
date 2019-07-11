import { Component } from '@angular/core';
import { ProductsService } from '../../products.service';
import { LuckyService } from './lucky.service';
@Component({
  selector: 'app-lucky',
  templateUrl: './lucky.component.html',
  styleUrls: ['./lucky.component.scss']
})
export class LuckyComponent {
  constructor(
    public productService: ProductsService,
    public luckyService: LuckyService
  ) {}
}
