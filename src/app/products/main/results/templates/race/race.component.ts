import { Component, Input } from '@angular/core';
import { EventResult } from './../../results.model';

@Component({
  selector: 'app-results-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent {
  @Input() items: number;
  @Input() rowHeight: number;
  @Input() results: EventResult[];
  @Input() codeProduct: string;
  constructor() { }

}
