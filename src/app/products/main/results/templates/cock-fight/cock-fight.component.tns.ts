import { Component, Input } from '@angular/core';
import { WindowSize } from '../../../../products.model';
import { EventResult } from '../../results.model';

@Component({
  selector: 'app-results-cock-fight',
  templateUrl: './cock-fight.component.html',
  styleUrls: ['./cock-fight.component.scss']
})
export class CockFightComponent {
  @Input() items: number;
  @Input() rowHeight: number;
  @Input() results: EventResult[];
  @Input() codeProduct: string;
  @Input() windowSize: WindowSize;
  constructor() { }
}
