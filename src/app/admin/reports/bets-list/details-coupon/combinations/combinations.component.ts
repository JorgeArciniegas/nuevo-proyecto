import { Component, Input, OnInit } from '@angular/core';
import { GroupingsRows } from '../detail-coupon.model';

@Component({
  selector: 'app-combinations',
  templateUrl: './combinations.component.html',
  styleUrls: ['./combinations.component.scss']
})
export class CombinationsComponent {

  @Input() data: GroupingsRows;

  constructor() { }


}
