import { Component, Input } from '@angular/core';
import { EventControl } from '../../event-control.model';
@Component({
  selector: 'app-event-control-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent {
  @Input() eventControlDetails: EventControl;
  constructor() {}
}