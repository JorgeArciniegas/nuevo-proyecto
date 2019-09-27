import { Component, OnInit, Input } from '@angular/core';
import { EventResult } from '../../results.model';

@Component({
  selector: 'app-results-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent {
  @Input() items: number;
  @Input() rowHeight: number;
  @Input() results: EventResult[];
  @Input() codeProduct: string;
  constructor() {
  }

}
