import { Component, OnInit, Input } from '@angular/core';
import { SummaryCoupon } from '@elys/elys-api';

@Component({
  selector: 'app-combinations',
  templateUrl: './combinations.component.html',
  styleUrls: ['./combinations.component.scss']
})
export class CombinationsComponent implements OnInit {

  @Input() data: SummaryCoupon;

  constructor() { }

  ngOnInit() {
  }

}
