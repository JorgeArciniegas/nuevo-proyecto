import { Component, Input } from '@angular/core';
import { BetDataDialog } from '../../../../../products/products.model';

@Component({
  selector: 'app-paytable-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent {
  @Input()
  data: BetDataDialog;

  constructor() { }
}
