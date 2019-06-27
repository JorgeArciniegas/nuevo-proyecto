import { Component, OnInit, Input } from '@angular/core';
import { EventControl } from '../../event-control.model';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent implements OnInit {
  @Input() eventControlDetails: EventControl;
  constructor() {}

  ngOnInit() {}
}
