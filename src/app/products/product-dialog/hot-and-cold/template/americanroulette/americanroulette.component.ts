import { Component, Input } from '@angular/core';
import { BetDataDialog } from '../../../../../products/products.model';

@Component({
  selector: 'app-hot-and-cold-americanroulette',
  templateUrl: './americanroulette.component.html',
  styleUrls: ['./americanroulette.component.scss']
})
export class AmericanrouletteComponent {

  @Input()
  data: BetDataDialog;

  constructor() { }

}
