import { Component, Input } from '@angular/core';
import { Colour } from '../../../playable-board/templates/colours/colours.models';
import { EventResult } from '../../results.model';

@Component({
  selector: 'app-results-colours',
  templateUrl: './colours.component.html',
  styleUrls: ['./colours.component.scss']
})
export class ColoursComponent {
  @Input() rowHeight: number;
  @Input() results: EventResult[];
  public Colour = Colour;

  constructor() { }

}
