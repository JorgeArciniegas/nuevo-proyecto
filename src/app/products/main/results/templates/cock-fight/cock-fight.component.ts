import { Component, Input, OnInit } from '@angular/core';
import { EventResult } from '../../results.model';

@Component({
  selector: 'app-results-cock-fight',
  templateUrl: './cock-fight.component.html',
  styleUrls: ['./cock-fight.component.scss']
})
export class CockFightComponent implements OnInit {
  @Input() items: number;
  @Input() rowHeight: number;
  @Input() results: EventResult[];
  @Input() codeProduct: string;
  constructor() {}

  ngOnInit() {}
}
