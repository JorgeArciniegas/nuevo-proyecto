import { Component, OnInit, Input } from '@angular/core';
import { EventResult } from '../../results.model';

@Component({
  selector: 'app-results-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent implements OnInit {
  @Input() rowHeight: number;
  @Input() results: EventResult[];
  lastResult: EventResult;

  constructor() { }

  ngOnInit() {
    // take last draw of the list
    this.lastResult = this.results[this.results.length - 1];
  }

}
