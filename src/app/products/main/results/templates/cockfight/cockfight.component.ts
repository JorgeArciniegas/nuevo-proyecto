import { Component, Input, OnInit } from '@angular/core';
import { EventResult } from '../../results.model';


@Component({
  selector: 'app-cockfight',
  templateUrl: './cockfight.component.html',
  styleUrls: ['./cockfight.component.scss']
})
export class CockfightComponent implements OnInit {
  @Input() items: number;
  @Input() rowHeight: number;
  @Input() results: EventResult[];
  @Input() codeProduct: string;
  constructor() { }

  ngOnInit() {
  }

}
