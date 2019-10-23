import { Component, Input } from '@angular/core';
import { EventResult } from '../../results.model';

@Component({
  selector: 'app-results-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent {
  @Input() rowHeight: number;
  @Input() results: EventResult;

  constructor() { }

}
