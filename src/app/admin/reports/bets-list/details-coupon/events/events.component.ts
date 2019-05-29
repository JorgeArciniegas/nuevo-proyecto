import { Component, OnInit, Input } from '@angular/core';
import { SummaryCoupon } from '@elys/elys-api';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @Input() data: SummaryCoupon;
  constructor() { }

  ngOnInit() {
  }

}
